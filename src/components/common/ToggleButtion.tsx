interface ToggleButtonProps {
  onButtonClick: () => void;
  isOn: boolean;
}

export const ToggleButton = ({ onButtonClick, isOn }: ToggleButtonProps) => {
  return (
    <button
      onClick={onButtonClick}
      className={`flex items-center w-11 h-6 p-1 rounded-full transition-colors ${
        isOn ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};
