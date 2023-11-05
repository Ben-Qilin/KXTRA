import React from "react"
import * as Accordion from '@radix-ui/react-accordion'
import classNames from 'classnames'

import '../style.scss'



const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames('AccordionContent', className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));

export default AccordionContent