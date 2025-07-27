import { ResultTripItem } from "./ResultTripItem.tsx"
import type { Trip } from "../../types/trip";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

interface SearchResultsProps {
  trips: Trip[];
  onAcceptTrip?: (tripId: string) => void;
  onClose?: () => void;
  className?: string;
  isVisible: boolean;
}

export const SearchResults = ({ trips, onAcceptTrip, onClose, className, isVisible }: SearchResultsProps) => {
  if (!isVisible) return null;

  return (
    <div className={cn(
      "absolute top-full left-1/2 transform -translate-x-1/2 z-30 bg-white rounded-lg shadow-lg mt-2 p-4",
      "max-h-96 overflow-y-auto min-w-[600px] max-w-4xl",
      "animate-in slide-in-from-top-2 duration-300",
      "border border-gray-200",
      className
    )}>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-[#602CAD] mb-1">
            Resultados de búsqueda
          </h3>
          <p className="text-sm text-gray-600">
            {trips.length} {trips.length === 1 ? 'viaje encontrado' : 'viajes encontrados'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Cerrar resultados"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      {trips.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No se encontraron viajes para tu búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-72 overflow-y-auto">
          {trips.map((trip) => (
            <div key={trip.id} className="w-full">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3 hover:from-purple-100 hover:to-purple-150 transition-all duration-200 border border-purple-200 shadow-sm">
                <ResultTripItem
                  trip={trip}
                  onAccept={onAcceptTrip}
                  className="px-2 py-1"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
