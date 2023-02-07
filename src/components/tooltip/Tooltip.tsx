import React, { cloneElement, useState, useRef } from 'react';
import {
  Placement,
  offset,
  flip,
  shift,
  useFloating,
  useInteractions,
  arrow,
  useRole,
  useDismiss,
  useClick,
  Side,
} from '@floating-ui/react-dom-interactions';

// import { mergeRefs } from './utils';

import './Tooltip.scss';

interface TooltipProps {
  label: string;
  placement?: Placement;
  children: JSX.Element;
}

const Tooltip = ({ children, label, placement = 'top' }: TooltipProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const arrowRef = useRef(null);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    placement: finalPlacement,
  } = useFloating<HTMLElement>({
    middleware: [offset(14), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
    onOpenChange: setOpen,
    open,
    placement,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context, { ancestorScroll: true }),
  ]);

  // Preserve the consumer's ref
  // const ref = useMemo(() => mergeRefs([reference, children.ref]), [reference, children]);

  const staticSide: string | undefined = {
    bottom: 'top',
    left: 'right',
    right: 'left',
    top: 'bottom',
  }[finalPlacement.split('-')[0]];

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}

      {open && (
        <div
          {...getFloatingProps({
            className: 'tooltip',
            ref: floating,
            style: {
              left: x ?? 0,
              position: strategy,
              top: y ?? 0,
            },
          })}
        >
          {label}
          <div
            className="arrow"
            ref={arrowRef}
            style={{
              bottom: '',
              left: arrowX ? `${arrowX}px` : '',
              right: '',
              top: arrowY ? `${arrowY}px` : '',
              [staticSide as Side]: '-4px',
            }}
          />
        </div>
      )}
    </>
  );
};

export { Tooltip };
