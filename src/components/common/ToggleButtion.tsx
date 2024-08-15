interface ToggleButtonProps {
  onButtonClick: () => void;
  isOn: boolean;
}

export const ToggleButton = ({ onButtonClick, isOn }: ToggleButtonProps) => {
  return (
    <label className="swap swap-rotate">
      {/* Hidden Checkbox */}
      <input
        type="checkbox"
        checked={isOn}
        onChange={onButtonClick}
        className="hidden"
      />

      {/* On State */}
      <div
        className={`swap-on w-9 h-5 bg-primary rounded-full flex items-center justify-end px-1 ${isOn ? 'flex' : 'hidden'}`}
      >
        <div className="w-3 h-3 bg-white rounded-full shadow-md"></div>
      </div>

      {/* Off State */}
      <div
        className={`swap-off w-9 h-5 bg-gray-300 rounded-full flex items-center justify-start px-1 ${isOn ? 'hidden' : 'flex'}`}
      >
        <div className="w-3 h-3 bg-white rounded-full shadow-md"></div>
      </div>
    </label>
  );
};
