import React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useHover,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  safePolygon,
} from "@floating-ui/react";
import { type Event } from "../types/types";
import { cn, formatEventTime } from "../utils/utils";
import { eventCategories } from "../config/eventCategories";
import { Clock } from "./icons/Clock";
import { Location } from "./icons/Location";

interface EventHoverCardProps {
  event: Event;
  className?: string;
}

export const EventCalendarItem = ({
  event,
  className,
}: EventHoverCardProps) => {
  const [open, setOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom",
    middleware: [
      offset(2),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
    ],
  });

  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const hover = useHover(context, {
    enabled: !isTouchDevice,
    move: false,
    handleClose: safePolygon(),
  });
  const click = useClick(context, { enabled: isTouchDevice });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ]);

  // Pick category config (or default)
  const category = event.type ? eventCategories[event.type] : undefined;
  const triggerClasses = category?.classes.item ?? "";
  const cardClasses = category?.classes.card ?? "bg-white";
  const badgeClasses = category?.classes.badge ?? "bg-gray-200 text-gray-700";
  const categoryName = category?.displayName ?? "Other";
  const fade = category?.classes.itemFade ?? "";

  const cardContent = (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">{event.title}</h3>
      <div className="text-sm flex gap-1 items-center">
        <Clock width={16} height={16}/>
        {formatEventTime(event.start, event.end)}
      </div>
      {event.locationName && (
        <div className="text-sm flex gap-1 items-center">
          <Location width={16} height={16}/>
          {event.locationName}
        </div>
      )}
      <div
        className={cn(
          "text-sm font-medium px-2 py-1 rounded w-fit ml-auto",
          badgeClasses
        )}
      >
        {categoryName}
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={cn(
          "cursor-default ml-[2px] mr-[1px] my-0.5 pl-[0.2rem] sm:pl-[0.4rem] text-xs sm:text-sm sm:mx-1 overflow-hidden relative",
          triggerClasses,
          className
        )}
      >
        <div className="relative">
          <span className="block text-nowrap text-clip font-semibold sm:font-medium leading-8">{event.title}</span>
          <div
            className={cn(
              "absolute inset-y-0 right-0 w-5 bg-gradient-to-r from-transparent pointer-events-none",
              fade
            )}
          />
        </div>
      </div>

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={cn(
              "rounded-lg min-w-64 border-2 z-50",
              cardClasses
            )}
          >
            {event.link ? (
              <a
                href={event.link}
                className="block p-3"
              >
                {cardContent}
              </a>
            ) : (
              <div className="p-3">{cardContent}</div>
            )}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};
