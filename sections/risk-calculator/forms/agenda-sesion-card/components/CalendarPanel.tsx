import { cn } from "@/utils/cn";
import { useAgendaSesionCardContext } from "../context/AgendaSesionCardContext";
import { CALENDAR_SKELETON_CELLS, WEEKDAY_LABELS } from "../lib/date";
import { MonthNavButton } from "./MonthNavButton";

export function CalendarPanel() {
  const {
    monthLabel,
    canNavigatePrev,
    canNavigateNext,
    daysLoading,
    daysError,
    enabledDatesCount,
    calendarCells,
    activeDaysMap,
    selectedDate,
    handlePrevMonth,
    handleNextMonth,
    handleSelectDate,
  } = useAgendaSesionCardContext();

  return (
    <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <MonthNavButton
          direction="prev"
          enabled={canNavigatePrev}
          onClick={handlePrevMonth}
        />
        <span className="text-sm font-bold capitalize text-text">{monthLabel}</span>
        <MonthNavButton
          direction="next"
          enabled={canNavigateNext}
          onClick={handleNextMonth}
        />
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
        {WEEKDAY_LABELS.map((weekdayLabel, index) => (
          <span key={`${weekdayLabel}-${index}`}>{weekdayLabel}</span>
        ))}
      </div>

      {daysLoading ? (
        <div className="grid grid-cols-7 gap-1">
          {CALENDAR_SKELETON_CELLS.map((cellIndex) => (
            <div
              key={`calendar-skeleton-${cellIndex}`}
              className="h-9 animate-pulse rounded-md bg-gray-200/70 dark:bg-gray-800/80"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {calendarCells.map((cell, index) => {
            if (!cell) {
              return <div key={`empty-${index}`} className="h-9" />;
            }

            const inRange = activeDaysMap.has(cell.dateKey);
            const enabled = activeDaysMap.get(cell.dateKey) === true;
            const selected = selectedDate === cell.dateKey;

            return (
              <button
                key={cell.dateKey}
                type="button"
                className={cn(
                  "h-9 rounded-md text-sm font-semibold transition-colors",
                  !inRange
                    ? "cursor-not-allowed text-gray-300 dark:text-gray-600"
                    : "cursor-pointer",
                  inRange &&
                    !enabled &&
                    "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-900/30 dark:text-gray-600",
                  inRange &&
                    enabled &&
                    !selected &&
                    "text-text hover:bg-primary/10 dark:hover:bg-primary/20",
                  selected &&
                    "bg-primary text-white hover:bg-primary/90 dark:text-white"
                )}
                disabled={!enabled || !inRange || daysLoading}
                onClick={() => handleSelectDate(cell.dateKey)}
              >
                {cell.dayNumber}
              </button>
            );
          })}
        </div>
      )}

      {daysError && (
        <p className="mt-3 text-xs text-red-500">
          {daysError}. Intenta recargar la página.
        </p>
      )}
      {!daysLoading && !daysError && enabledDatesCount === 0 && (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          No hay días activos configurados para las próximas 2 semanas.
        </p>
      )}
    </section>
  );
}
