'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var context = require('@reach/utils/context');
var typeCheck = require('@reach/utils/type-check');
var makeId = require('@reach/utils/make-id');
var noop = require('@reach/utils/noop');
var devUtils = require('@reach/utils/dev-utils');
var composeRefs = require('@reach/utils/compose-refs');
var composeEventHandlers = require('@reach/utils/compose-event-handlers');
var useStatefulRefValue = require('@reach/utils/use-stateful-ref-value');
var warning = require('tiny-warning');
var descendants = require('@reach/descendants');
var autoId = require('@reach/auto-id');
var PropTypes = require('prop-types');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var warning__default = /*#__PURE__*/_interopDefault(warning);
var PropTypes__default = /*#__PURE__*/_interopDefault(PropTypes);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["as", "children", "defaultIndex", "index", "onChange", "readOnly", "collapsible", "multiple"],
    _excluded2 = ["as", "children", "disabled", "index"],
    _excluded3 = ["as", "children", "onClick", "onKeyDown", "onMouseDown", "onPointerDown", "tabIndex"],
    _excluded4 = ["as", "children"];
var AccordionDescendantContext = /*#__PURE__*/descendants.createDescendantContext("AccordionDescendantContext");
var AccordionContext = /*#__PURE__*/context.createNamedContext("AccordionContext", {});
var AccordionItemContext = /*#__PURE__*/context.createNamedContext("AccordionItemContext", {}); ////////////////////////////////////////////////////////////////////////////////

 ////////////////////////////////////////////////////////////////////////////////

/**
 * Accordion
 *
 * The wrapper component for all other accordion components. Each accordion
 * component will consist of accordion items whose buttons are keyboard
 * navigable using arrow keys.
 *
 * @see Docs https://reach.tech/accordion#accordion-1
 */

(function (AccordionStates) {
  AccordionStates["Open"] = "OPEN";
  AccordionStates["Collapsed"] = "COLLAPSED";
})(exports.AccordionStates || (exports.AccordionStates = {}));

var Accordion = /*#__PURE__*/React.forwardRef(function Accordion(_ref, forwardedRef) {
  var _ref$as = _ref.as,
      Comp = _ref$as === void 0 ? "div" : _ref$as,
      children = _ref.children,
      defaultIndex = _ref.defaultIndex,
      controlledIndex = _ref.index,
      onChange = _ref.onChange,
      _ref$readOnly = _ref.readOnly,
      readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
      _ref$collapsible = _ref.collapsible,
      collapsible = _ref$collapsible === void 0 ? false : _ref$collapsible,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? false : _ref$multiple,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  /*
   * You shouldn't switch between controlled/uncontrolled. We'll check for a
   * controlled component and track any changes in a ref to show a warning.
   */
  var wasControlled = typeof controlledIndex !== "undefined";

  var _React$useRef = React.useRef(wasControlled),
      isControlled = _React$useRef.current;

  var _useDescendantsInit = descendants.useDescendantsInit(),
      descendants$1 = _useDescendantsInit[0],
      setDescendants = _useDescendantsInit[1];

  var id = autoId.useId(props.id); // Define our default starting index

  var _React$useState = React.useState(function () {
    switch (true) {
      case isControlled:
        return controlledIndex;
      // If we have a defaultIndex, we need to do a few checks

      // If we have a defaultIndex, we need to do a few checks
      case defaultIndex != null:
        /*
         * If multiple is set to true, we need to make sure the `defaultIndex`
         * is an array (and vice versa). We'll handle console warnings in
         * our propTypes, but this will at least keep the component from
         * blowing up.
         */
        if (multiple) {
          return Array.isArray(defaultIndex) ? defaultIndex : [defaultIndex];
        } else {
          var _defaultIndex$;

          return Array.isArray(defaultIndex) ? (_defaultIndex$ = defaultIndex[0]) != null ? _defaultIndex$ : 0 : defaultIndex;
        }

      /*
       * Collapsible accordions with no defaultIndex will start with all
       * panels collapsed. Otherwise the first panel will be our default.
       */

      /*
       * Collapsible accordions with no defaultIndex will start with all
       * panels collapsed. Otherwise the first panel will be our default.
       */
      case collapsible:
        return multiple ? [] : -1;

      default:
        return multiple ? [0] : 0;
    }
  }),
      openPanels = _React$useState[0],
      setOpenPanels = _React$useState[1];

  if (process.env.NODE_ENV !== "production") {
    process.env.NODE_ENV !== "production" ? warning__default['default'](!(!isControlled && wasControlled), "Accordion is changing from controlled to uncontrolled. Accordion should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Accordion for the lifetime of the component. Check the `index` prop being passed in.") : void 0;
    process.env.NODE_ENV !== "production" ? warning__default['default'](!(isControlled && !wasControlled), "Accordion is changing from uncontrolled to controlled. Accordion should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled Accordion for the lifetime of the component. Check the `index` prop being passed in.") : void 0;
    process.env.NODE_ENV !== "production" ? warning__default['default'](!(isControlled && collapsible), "The `collapsible` prop on Accordion has no effect when the state of the component is controlled.") : void 0;
    process.env.NODE_ENV !== "production" ? warning__default['default'](!(isControlled && multiple), "The `multiple` prop on Accordion has no effect when the state of the component is controlled.") : void 0;
  }

  var onSelectPanel = React.useCallback(function (index) {
    onChange && onChange(index);

    if (!isControlled) {
      setOpenPanels(function (prevOpenPanels) {
        /*
         * If we're dealing with an uncontrolled component, the index arg
         * in selectChange will always be a number rather than an array.
         */
        index = index; // multiple allowed

        if (multiple) {
          // state will always be an array here
          prevOpenPanels = prevOpenPanels;

          if ( // User is clicking on an already-open button
          prevOpenPanels.includes(index)) {
            // Other panels are open OR accordion is allowed to collapse
            if (prevOpenPanels.length > 1 || collapsible) {
              // Close the panel by filtering it from the array
              return prevOpenPanels.filter(function (i) {
                return i !== index;
              });
            }
          } else {
            // Open the panel by adding it to the array.
            return [].concat(prevOpenPanels, [index]).sort();
          }
        } else {
          prevOpenPanels = prevOpenPanels;
          return prevOpenPanels === index && collapsible ? -1 : index;
        }

        return prevOpenPanels;
      });
    }
  }, [collapsible, isControlled, multiple, onChange]);
  var context = React.useMemo(function () {
    return {
      accordionId: id,
      openPanels: isControlled ? controlledIndex : openPanels,
      onSelectPanel: readOnly ? noop.noop : onSelectPanel,
      readOnly: readOnly
    };
  }, [openPanels, controlledIndex, id, isControlled, onSelectPanel, readOnly]);
  devUtils.useCheckStyles("accordion");
  return /*#__PURE__*/React.createElement(descendants.DescendantProvider, {
    context: AccordionDescendantContext,
    items: descendants$1,
    set: setDescendants
  }, /*#__PURE__*/React.createElement(AccordionContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(Comp, _extends({}, props, {
    ref: forwardedRef,
    "data-reach-accordion": ""
  }), children)));
});
/**
 * @see Docs https://reach.tech/accordion#accordion-props
 */

if (process.env.NODE_ENV !== "production") {
  Accordion.displayName = "Accordion";
  Accordion.propTypes = {
    children: PropTypes__default['default'].node.isRequired,
    defaultIndex: /*#__PURE__*/PropTypes__default['default'].oneOfType([PropTypes__default['default'].number, /*#__PURE__*/PropTypes__default['default'].arrayOf(PropTypes__default['default'].number)]),
    index: function index(props, name, compName, location, propName) {
      var val = props[name];

      if (props[name] != null && props.onChange == null && !props.readOnly) {
        return new Error("You provided an `index` prop to `Accordion` without an `onChange` handler. This will render a read-only accordion element. If the accordion should be functional, remove the `index` value to render an uncontrolled accordion or set an `onChange` handler to set an index when a change occurs. If the accordion is intended to have a fixed state, use the `readOnly` prop with a `defaultIndex` instead of an `index`.");
      }

      if (props[name] != null && props.defaultIndex != null) {
        return new Error("You provided an `index` prop as well as a `defaultIndex` prop to `Accordion`. If you want a controlled component, use the index prop with an onChange handler. If you want an uncontrolled component, remove the index prop and use `defaultIndex` instead.");
      }

      if (Array.isArray(props[name])) {
        return props[name].some(function (i) {
          return !typeCheck.isNumber(i);
        }) ? new Error("You provided an array as an index in `Accordion` but one or more of the values are not numeric. Please check to make sure all indices are valid numbers.") : null;
      } else if (props[name] != null && !typeCheck.isNumber(props[name])) {
        return new Error("Invalid prop \"" + propName + "\" supplied to \"" + compName + "\". Expected \"number\", received \"" + (Array.isArray(val) ? "array" : typeof val) + "\".");
      }

      return null;
    },
    multiple: function multiple(props, name, compName, location, propName) {
      if (!props[name] && Array.isArray(props.defaultIndex)) {
        return new Error("The \"" + propName + "\" prop supplied to \"" + compName + "\" is not set or set to \"false\", but an array of indices was provided to the \"defaultIndex\" prop. \"" + compName + "\" can only have more than one default index if the \"" + propName + "\" prop is set to \"true\".");
      } else if (props[name] != null && !typeCheck.isBoolean(props[name])) {
        return new Error("Invalid prop \"" + propName + "\" supplied to \"" + compName + "\". Expected \"boolean\", received \"" + (Array.isArray(props[name]) ? "array" : typeof props[name]) + "\".");
      }

      return null;
    },
    onChange: PropTypes__default['default'].func,
    readOnly: PropTypes__default['default'].bool,
    collapsible: PropTypes__default['default'].bool
  };
}
/**
 * AccordionItem
 *
 * A group that wraps a an accordion's button and panel components.
 *
 * @see Docs https://reach.tech/accordion#accordionitem
 */


var AccordionItem = /*#__PURE__*/React.forwardRef(function AccordionItem(_ref2, forwardedRef) {
  var _ref2$as = _ref2.as,
      Comp = _ref2$as === void 0 ? "div" : _ref2$as,
      children = _ref2.children,
      _ref2$disabled = _ref2.disabled,
      disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
      indexProp = _ref2.index,
      props = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  var _React$useContext = React.useContext(AccordionContext),
      accordionId = _React$useContext.accordionId,
      openPanels = _React$useContext.openPanels,
      readOnly = _React$useContext.readOnly;

  var buttonRef = React.useRef(null);

  var _useStatefulRefValue = useStatefulRefValue.useStatefulRefValue(buttonRef, null),
      element = _useStatefulRefValue[0],
      handleButtonRefSet = _useStatefulRefValue[1];

  var descendant = React.useMemo(function () {
    return {
      element: element,
      disabled: disabled
    };
  }, [disabled, element]);
  var index = descendants.useDescendant(descendant, AccordionDescendantContext, indexProp); // We need unique IDs for the panel and button to point to one another

  var itemId = makeId.makeId(accordionId, index);
  var panelId = makeId.makeId("panel", itemId);
  var buttonId = makeId.makeId("button", itemId);
  var state = (Array.isArray(openPanels) ? openPanels.includes(index) && exports.AccordionStates.Open : openPanels === index && exports.AccordionStates.Open) || exports.AccordionStates.Collapsed;
  var context = {
    buttonId: buttonId,
    buttonRef: buttonRef,
    disabled: disabled,
    handleButtonRefSet: handleButtonRefSet,
    index: index,
    itemId: itemId,
    panelId: panelId,
    state: state
  };
  return /*#__PURE__*/React.createElement(AccordionItemContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(Comp, _extends({}, props, {
    ref: forwardedRef,
    "data-reach-accordion-item": "",
    "data-state": getDataState(state),
    "data-disabled": disabled ? "" : undefined,
    "data-read-only": readOnly ? "" : undefined
  }), children));
});
/**
 * @see Docs https://reach.tech/accordion#accordionitem-props
 */

if (process.env.NODE_ENV !== "production") {
  AccordionItem.displayName = "AccordionItem";
  AccordionItem.propTypes = {
    disabled: PropTypes__default['default'].bool
  };
} ////////////////////////////////////////////////////////////////////////////////

/**
 * AccordionButton
 *
 * The trigger button a user clicks to interact with an accordion.
 *
 * Must be a direct child of a `AccordionItem`.
 *
 * @see Docs https://reach.tech/accordion#accordionbutton
 */


var AccordionButton = /*#__PURE__*/React.forwardRef(function AccordionButton(_ref3, forwardedRef) {
  var _ref3$as = _ref3.as,
      Comp = _ref3$as === void 0 ? "button" : _ref3$as,
      children = _ref3.children,
      onClick = _ref3.onClick,
      onKeyDown = _ref3.onKeyDown;
      _ref3.onMouseDown;
      _ref3.onPointerDown;
      var tabIndex = _ref3.tabIndex,
      props = _objectWithoutPropertiesLoose(_ref3, _excluded3);

  var _React$useContext2 = React.useContext(AccordionContext),
      onSelectPanel = _React$useContext2.onSelectPanel;

  var _React$useContext3 = React.useContext(AccordionItemContext),
      disabled = _React$useContext3.disabled,
      buttonId = _React$useContext3.buttonId,
      ownRef = _React$useContext3.buttonRef,
      handleButtonRefSet = _React$useContext3.handleButtonRefSet,
      index = _React$useContext3.index,
      panelId = _React$useContext3.panelId,
      state = _React$useContext3.state;

  var ref = composeRefs.useComposedRefs(forwardedRef, handleButtonRefSet);

  function handleClick(event) {
    event.preventDefault();

    if (disabled) {
      return;
    }

    ownRef.current.focus();
    onSelectPanel(index);
  }

  var handleKeyDown = descendants.useDescendantKeyDown(AccordionDescendantContext, {
    currentIndex: index,
    orientation: "vertical",
    key: "element",
    rotate: true,
    callback: function callback(element) {
      element == null ? void 0 : element.focus();
    },
    filter: function filter(button) {
      return !button.disabled;
    }
  });
  return /*#__PURE__*/React.createElement(Comp // Each accordion header `button` is wrapped in an element with role
  // `heading` that has a value set for `aria-level` that is appropriate
  // for the information architecture of the page.
  // https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
  // I believe this should be left for apps to handle, since headings
  // are necessarily context-aware. An app can wrap a button inside any
  // arbitrary tag(s).
  // TODO: Revisit documentation and examples
  // @example
  // <div>
  //   <h3>
  //     <AccordionButton>Click Me</AccordionButton>
  //   </h3>
  //   <SomeComponent />
  // </div>
  // The title of each accordion header is contained in an element with
  // role `button`. We use an HTML button by default, so we can omit
  // this attribute.
  // https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
  // role="button"
  // The accordion header `button` element has `aria-controls` set to the
  // ID of the element containing the accordion panel content.
  // https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
  , _extends({
    "aria-controls": panelId // If the accordion panel associated with an accordion header is
    // visible, the header `button` element has `aria-expanded` set to
    // `true`. If the panel is not visible, `aria-expanded` is set to
    // `false`.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
    ,
    "aria-expanded": state === exports.AccordionStates.Open,
    tabIndex: disabled ? -1 : tabIndex
  }, props, {
    ref: ref,
    "data-reach-accordion-button": "",
    "data-state": getDataState(state) // If the accordion panel associated with an accordion header is
    // visible, and if the accordion does not permit the panel to be
    // collapsed, the header `button` element has `aria-disabled` set to
    // `true`. We can use `disabled` since we opt for an HTML5 `button`
    // element.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
    ,
    disabled: disabled || undefined,
    id: buttonId,
    onClick: composeEventHandlers.composeEventHandlers(onClick, handleClick),
    onKeyDown: composeEventHandlers.composeEventHandlers(onKeyDown, handleKeyDown)
  }), children);
});
/**
 * @see Docs https://reach.tech/accordion#accordionbutton-props
 */

if (process.env.NODE_ENV !== "production") {
  AccordionButton.displayName = "AccordionButton";
  AccordionButton.propTypes = {
    as: PropTypes__default['default'].any,
    children: PropTypes__default['default'].node
  };
} ////////////////////////////////////////////////////////////////////////////////

/**
 * AccordionPanel
 *
 * The collapsible panel in which inner content for an accordion item is
 * rendered.
 *
 * @see Docs https://reach.tech/accordion#accordionpanel
 */


var AccordionPanel = /*#__PURE__*/React.forwardRef(function AccordionPanel(_ref4, forwardedRef) {
  var _ref4$as = _ref4.as,
      Comp = _ref4$as === void 0 ? "div" : _ref4$as,
      children = _ref4.children,
      props = _objectWithoutPropertiesLoose(_ref4, _excluded4);

  var _React$useContext4 = React.useContext(AccordionItemContext),
      disabled = _React$useContext4.disabled,
      panelId = _React$useContext4.panelId,
      buttonId = _React$useContext4.buttonId,
      state = _React$useContext4.state;

  return /*#__PURE__*/React.createElement(Comp, _extends({
    hidden: state !== exports.AccordionStates.Open // Optionally, each element that serves as a container for panel content
    // has role `region` and `aria-labelledby` with a value that refers to
    // the button that controls display of the panel.
    // Role `region` is especially helpful to the perception of structure by
    // screen reader users when panels contain heading elements or a nested
    // accordion.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
    // Avoid using the region role in circumstances that create landmark
    // region proliferation, e.g., in an accordion that contains more than
    // approximately 6 panels that can be expanded at the same time.
    // A user can override this with `role="none"` or `role="presentation"`
    // TODO: Add to docs
    ,
    role: "region",
    "aria-labelledby": buttonId
  }, props, {
    ref: forwardedRef,
    "data-reach-accordion-panel": "",
    "data-disabled": disabled || undefined,
    "data-state": getDataState(state),
    id: panelId
  }), children);
});
/**
 * @see Docs https://reach.tech/accordion#accordionpanel-props
 */

if (process.env.NODE_ENV !== "production") {
  AccordionPanel.displayName = "AccordionPanel";
  AccordionPanel.propTypes = {
    children: PropTypes__default['default'].node
  };
} ////////////////////////////////////////////////////////////////////////////////

/**
 * A hook that exposes data for a given `Accordion` component to its
 * descendants.
 *
 * @see Docs https://reach.tech/accordion#useaccordioncontext
 */


function useAccordionContext() {
  var _React$useContext5 = React.useContext(AccordionContext),
      openPanels = _React$useContext5.openPanels,
      accordionId = _React$useContext5.accordionId;

  return React.useMemo(function () {
    var panels = [];
    return {
      id: accordionId,
      openPanels: panels.concat(openPanels).filter(function (i) {
        return i >= 0;
      })
    };
  }, [accordionId, openPanels]);
}
/**
 * A hook that exposes data for a given `AccordionItem` component to its
 * descendants.
 *
 * @see Docs https://reach.tech/accordion#useaccordionitemcontext
 */


function useAccordionItemContext() {
  var _React$useContext6 = React.useContext(AccordionItemContext),
      index = _React$useContext6.index,
      state = _React$useContext6.state;

  return React.useMemo(function () {
    return {
      index: index,
      isExpanded: state === exports.AccordionStates.Open
    };
  }, [index, state]);
} ////////////////////////////////////////////////////////////////////////////////


function getDataState(state) {
  return state === exports.AccordionStates.Open ? "open" : "collapsed";
} ////////////////////////////////////////////////////////////////////////////////

exports.Accordion = Accordion;
exports.AccordionButton = AccordionButton;
exports.AccordionItem = AccordionItem;
exports.AccordionPanel = AccordionPanel;
exports.useAccordionContext = useAccordionContext;
exports.useAccordionItemContext = useAccordionItemContext;
