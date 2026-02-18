import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useAgendaSesionCardContext } from "../context/AgendaSesionCardContext";
import { SLOT_SKELETON_ROWS, formatLongDate, formatTimeRange } from "../lib/date";

export function SlotsPanel() {
  const {
    selectedDate,
    timeZone,
    showSlotsSkeleton,
    slotsError,
    slots,
    selectedSlot,
    bookingPending,
    canBook,
    bookingError,
    bookingSuccess,
    handleSelectSlot,
    handleBookSlot,
  } = useAgendaSesionCardContext();

  return (
    <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
      <h3 className="text-base font-bold text-text">
        {showSlotsSkeleton ? (
          <span className="block h-5 w-56 animate-pulse rounded bg-gray-200/70 dark:bg-gray-800/80" />
        ) : selectedDate ? (
          `Horarios para ${formatLongDate(selectedDate, timeZone)}`
        ) : (
          "Selecciona un día para ver horarios"
        )}
      </h3>

      <div className="mt-4 flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
        {showSlotsSkeleton &&
          SLOT_SKELETON_ROWS.map((rowIndex) => (
            <div
              key={`slot-skeleton-${rowIndex}`}
              className="h-10 animate-pulse rounded-lg border border-gray-200 bg-gray-100/90 dark:border-gray-800 dark:bg-gray-900/70"
            />
          ))}

        {!showSlotsSkeleton && slotsError && (
          <span className="text-sm text-red-500">{slotsError}</span>
        )}

        {!showSlotsSkeleton && !slotsError && selectedDate && slots.length === 0 && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            No hay bloques disponibles para este día.
          </span>
        )}

        {!showSlotsSkeleton &&
          !slotsError &&
          slots.map((slot) => {
            const isSelected =
              selectedSlot?.start === slot.start && selectedSlot?.end === slot.end;
            return (
              <button
                key={`${slot.start}-${slot.end}`}
                type="button"
                className={cn(
                  "cursor-pointer rounded-lg border px-3 py-2 text-left text-sm font-semibold transition-colors",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary dark:bg-primary/20 dark:text-white"
                    : "border-gray-200 text-text hover:border-primary/60 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900/50"
                )}
                onClick={() => handleSelectSlot(slot)}
                disabled={bookingPending}
              >
                {formatTimeRange(slot, timeZone)}
              </button>
            );
          })}
      </div>

      <div className="mt-4">
        <Button
          text="Agendar hora seleccionada"
          fullWidth
          onClick={() => void handleBookSlot()}
          disabled={!canBook}
          loading={bookingPending}
        />
      </div>

      {bookingError && (
        <p className="mt-3 text-sm text-red-500" role="alert">
          {bookingError}
        </p>
      )}

      {bookingSuccess && (
        <div className="mt-3 rounded-lg border border-emerald-300 bg-emerald-50 p-3 dark:border-emerald-700/70 dark:bg-emerald-900/20">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            {bookingSuccess.message}
          </p>
          <p className="mt-1 text-xs text-emerald-700/90 dark:text-emerald-300/90">
            {formatTimeRange(
              {
                start: bookingSuccess.booking.startDateTime,
                end: bookingSuccess.booking.endDateTime,
              },
              bookingSuccess.booking.timeZone
            )}
          </p>
        </div>
      )}
    </section>
  );
}
