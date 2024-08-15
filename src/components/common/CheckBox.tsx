import React from 'react';

const CheckBox = () => {
  return (
    <label className="form-control w-full py-2">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Remember me</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
    </label>
  );
};

export default CheckBox;
