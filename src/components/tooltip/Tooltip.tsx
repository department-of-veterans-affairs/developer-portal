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
} from '@floating-ui/react';

import './Tooltip.scss';

export interface TooltipProps {
  label: string;
  placement?: Placement;
  children: JSX.Element;
}

export const Tooltip = ({ children, label, placement = 'top' }: TooltipProps): JSX.Element => {
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

  const staticSide: string | undefined = {
    bottom: 'top',
    left: 'right',
    right: 'left',
    top: 'bottom',
  }[finalPlacement.split('-')[0]];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const props: React.HTMLProps<Element> = { ref: reference, ...children.props };

  return (
    <>
      {cloneElement(children, getReferenceProps(props))}

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
