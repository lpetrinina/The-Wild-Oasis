import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const { isPending, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isPending) {
    return <Spinner />;
  }

  function handleUpdate(e, field) {
    const { value, defaultValue } = e.target;

    if (!value || value === defaultValue) {
      return;
    }

    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          disabled={isUpdating}
          defaultValue={settings.minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          disabled={isUpdating}
          defaultValue={settings.maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          disabled={isUpdating}
          defaultValue={settings.maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          disabled={isUpdating}
          defaultValue={settings.breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
