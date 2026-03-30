import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useAgendaSesionCardContext } from "../context/AgendaSesionCardContext";
import { SLOT_SKELETON_ROWS, formatLongDate, formatTimeRange } from "../lib/date";

export function SlotsPanel() {
  const router = useRouter();
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

  const bookingFollowUpMessage = bookingSuccess?.emailSent
    ? "Revisa el correo electrónico que ingresaste para encontrar la confirmación de la reunión y el archivo para agregarla a tu calendario. Si no lo ves en los próximos minutos, revisa también spam o correo no deseado."
    : "Tu reunión quedó reservada, pero no pudimos confirmar el envío del correo al email ingresado. Revisa spam o correo no deseado de todas formas y, si no recibes nada, contáctanos para ayudarte.";

  function handleGoToHome() {
    router.push("/");
  }

  return (
    <>
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
      </section>

      {bookingSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-success-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl dark:border dark:border-gray-800">
            <h4 id="booking-success-title" className="text-lg font-bold text-text">
              Sesión agendada con éxito
            </h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {bookingSuccess.message}
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              {bookingFollowUpMessage}
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {formatTimeRange(
                {
                  start: bookingSuccess.booking.startDateTime,
                  end: bookingSuccess.booking.endDateTime,
                },
                bookingSuccess.booking.timeZone
              )}
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Gracias por agendar en Isolegal. Mientras llega la confirmación,
              puedes seguir explorando nuestras soluciones y preparar tu próxima
              etapa de cumplimiento legal.
            </p>
            <div className="mt-5">
              <Button text="Ir al inicio de Isolegal" fullWidth onClick={handleGoToHome} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
