import React from "react"
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'
import {ChevronDownIcon} from '@radix-ui/react-icons'
import '../style.scss'

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className={classNames('AccordionTrigger', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));
export default AccordionTrigger