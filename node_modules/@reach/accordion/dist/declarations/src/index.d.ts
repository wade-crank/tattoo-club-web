/**
 * Welcome to @reach/accordion!
 *
 * TODO: Animation examples
 *
 * @see Docs     https://reach.tech/accordion
 * @see Source   https://github.com/reach/reach-ui/tree/main/packages/accordion
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
 */
import * as React from "react";
import type * as Polymorphic from "@reach/utils/polymorphic";
declare enum AccordionStates {
    Open = "OPEN",
    Collapsed = "COLLAPSED"
}
/**
 * Accordion
 *
 * The wrapper component for all other accordion components. Each accordion
 * component will consist of accordion items whose buttons are keyboard
 * navigable using arrow keys.
 *
 * @see Docs https://reach.tech/accordion#accordion-1
 */
declare const Accordion: Polymorphic.ForwardRefComponent<"div", AccordionProps>;
/**
 * @see Docs https://reach.tech/accordion#accordion-props
 */
interface AccordionProps {
    /**
     * `Accordion` can accept `AccordionItem` components as children.
     *
     * @see Docs https://reach.tech/accordion#accordion-children
     */
    children: React.ReactNode;
    /**
     * Whether or not all panels of an uncontrolled accordion can be toggled
     * to a closed state. By default, an uncontrolled accordion will have an open
     * panel at all times, meaning a panel can only be closed if the user opens
     * another panel. This prop allows the user to collapse all open panels.
     *
     * It's important to note that this prop has no impact on controlled
     * components, since the state of any given accordion panel is managed solely
     * by the index prop.
     */
    collapsible?: boolean;
    /**
     * A default value for the open panel's index or indices in an uncontrolled
     * accordion component when it is initially rendered.
     *
     * @see Docs https://reach.tech/accordion#accordion-defaultindex
     */
    defaultIndex?: AccordionIndex;
    /**
     * The index or array of indices for open accordion panels. The `index` props
     * should be used along with `onChange` to create controlled accordion
     * components.
     *
     * @see Docs https://reach.tech/accordion#accordion-index
     */
    index?: AccordionIndex;
    /**
     * The callback that is fired when an accordion item's open state is changed.
     *
     * @see Docs https://reach.tech/accordion#accordion-onchange
     */
    onChange?(index?: number): void;
    /**
     * Whether or not an uncontrolled accordion is read-only or controllable by a
     * user interaction.
     *
     * Generally speaking you probably want to avoid this, as
     * it can be confusing especially when navigating by keyboard. However, this
     * may be useful if you want to lock an accordion under certain conditions
     * (perhaps user authentication is required to access the content). In these
     * instances, you may want to include an alert when a user tries to activate
     * a read-only accordion panel to let them know why it does not toggle as may
     * be expected.
     *
     * TODO: Create example with @reach/alert.
     *
     * @see Docs https://reach.tech/accordion#accordion-onchange
     */
    readOnly?: boolean;
    /**
     * Whether or not multiple panels in an uncontrolled accordion can be opened
     * at the same time. By default, when a user opens a new panel, the previously
     * opened panel will close. This prop prevents that behavior.
     *
     * It's important to note that this prop has no impact on controlled
     * components, since the state of any given accordion panel is managed solely
     * by the index prop.
     */
    multiple?: boolean;
}
/**
 * AccordionItem
 *
 * A group that wraps a an accordion's button and panel components.
 *
 * @see Docs https://reach.tech/accordion#accordionitem
 */
declare const AccordionItem: Polymorphic.ForwardRefComponent<"div", AccordionItemProps>;
/**
 * @see Docs https://reach.tech/accordion#accordionitem-props
 */
interface AccordionItemProps {
    /**
     * An `AccordionItem` expects to receive an `AccordionButton` and
     * `AccordionPanel` components as its children, though you can also nest other
     * components within an `AccordionItem` if you want some persistant content
     * that is relevant to the section but not collapsible when the
     * `AccordionButton` is toggled.
     *
     * @see Docs https://reach.tech/accordion#accordionitem-children
     */
    children: React.ReactNode;
    /**
     * Whether or not an accordion panel is disabled from user interaction.
     *
     * @see Docs https://reach.tech/accordion#accordionitem-disabled
     */
    disabled?: boolean;
    /**
     * TODO: Document this!
     */
    index?: number;
}
/**
 * AccordionButton
 *
 * The trigger button a user clicks to interact with an accordion.
 *
 * Must be a direct child of a `AccordionItem`.
 *
 * @see Docs https://reach.tech/accordion#accordionbutton
 */
declare const AccordionButton: Polymorphic.ForwardRefComponent<"button", AccordionButtonProps>;
/**
 * @see Docs https://reach.tech/accordion#accordionbutton-props
 */
interface AccordionButtonProps {
    /**
     * Typically a text string that serves as a label for the accordion, though
     * nested DOM nodes can be passed as well so long as they are valid children
     * of interactive elements.
     *
     * @see https://github.com/w3c/html-aria/issues/54
     * @see Docs https://reach.tech/accordion#accordionbutton-children
     */
    children: React.ReactNode;
}
/**
 * AccordionPanel
 *
 * The collapsible panel in which inner content for an accordion item is
 * rendered.
 *
 * @see Docs https://reach.tech/accordion#accordionpanel
 */
declare const AccordionPanel: Polymorphic.ForwardRefComponent<"div", AccordionPanelProps>;
/**
 * @see Docs https://reach.tech/accordion#accordionpanel-props
 */
interface AccordionPanelProps {
    /**
     * Inner collapsible content for the accordion item.
     *
     * @see Docs https://reach.tech/accordion#accordionpanel-children
     */
    children: React.ReactNode;
}
/**
 * A hook that exposes data for a given `Accordion` component to its
 * descendants.
 *
 * @see Docs https://reach.tech/accordion#useaccordioncontext
 */
declare function useAccordionContext(): AccordionContextValue;
/**
 * A hook that exposes data for a given `AccordionItem` component to its
 * descendants.
 *
 * @see Docs https://reach.tech/accordion#useaccordionitemcontext
 */
declare function useAccordionItemContext(): AccordionItemContextValue;
interface AccordionContextValue {
    id: string | undefined;
    openPanels: number[];
}
interface AccordionItemContextValue {
    index: number;
    isExpanded: boolean;
}
declare type AccordionIndex = number | number[];
export type { AccordionButtonProps, AccordionContextValue, AccordionItemContextValue, AccordionItemProps, AccordionPanelProps, AccordionProps, };
export { Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionStates, useAccordionContext, useAccordionItemContext, };
