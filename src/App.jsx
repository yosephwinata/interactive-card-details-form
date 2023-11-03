import { useState } from "react";
import { useFormInput } from "./useFormInput";

function App() {
  const { inputProps: nameProps, setErrorMsg: setNameErrorMsg } =
    useFormInput(30);
  const { inputProps: cardNumberProps, setErrorMsg: setCardNumberErrorMsg } =
    useFormInput(16);
  const { inputProps: monthExpProps, setErrorMsg: setMonthExpErrorMsg } =
    useFormInput(2);
  const { inputProps: yearExpProps, setErrorMsg: setYearExpErrorMsg } =
    useFormInput(2);
  const { inputProps: cvcProps, setErrorMsg: setCvcErrorMsg } = useFormInput(3);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConfirmButtonClick = (e) => {
    e.preventDefault();
    let errorFound = false;
    if (nameProps.value === "") {
      setNameErrorMsg("Can't be blank");
      errorFound = true;
    }
    if (cardNumberProps.value === "") {
      setCardNumberErrorMsg("Can't be blank");
      errorFound = true;
    }
    if (monthExpProps.value === "") {
      setMonthExpErrorMsg("Can't be blank");
      errorFound = true;
    }
    if (yearExpProps.value === "") {
      setYearExpErrorMsg("Can't be blank");
      errorFound = true;
    }
    if (cvcProps.value === "") {
      setCvcErrorMsg("Can't be blank");
      errorFound = true;
    }
    if (errorFound) return;
    setIsSubmitted(true);
  };

  return (
    <div className="relative xl:flex xl:h-screen xl:items-center">
      <CreditCardVisual
        name={nameProps.value}
        cardNumber={cardNumberProps.value}
        monthExp={monthExpProps.value}
        yearExp={yearExpProps.value}
        cvc={cvcProps.value}
      />
      {isSubmitted ? (
        <ThankYou />
      ) : (
        <CreditCardForm
          nameProps={nameProps}
          cardNumberProps={cardNumberProps}
          monthExpProps={monthExpProps}
          yearExpProps={yearExpProps}
          cvcProps={cvcProps}
          onConfirmClick={handleConfirmButtonClick}
        />
      )}
    </div>
  );
}

const CreditCardVisual = ({ name, cardNumber, monthExp, yearExp, cvc }) => {
  return (
    <div>
      <img
        src="images/bg-main-mobile.png"
        alt="Background Image"
        className="mb-[5.6875rem] block w-full xl:hidden"
      />
      <img
        src="images/bg-main-desktop.png"
        alt="Background Image"
        className="xl: hidden xl:absolute xl:left-0 xl:top-0 xl:block xl:h-screen"
      />
      <div className="absolute right-4 top-8 w-[17.875rem] xl:left-[20%] xl:right-0 xl:top-[50%] xl:w-[28rem]">
        <img
          src="images/bg-card-back.png"
          alt="Back of Credit Card"
          className="w-full"
        />
        <span className="absolute right-[2.4rem] top-[4.5rem] text-[0.5625rem] tracking-[1.29px] text-white xl:right-[3rem] xl:top-[6.9rem] xl:text-sm">
          {cvc ? cvc : "000"}
        </span>
      </div>
      <div className="absolute left-4 top-[7.875rem] w-[17.875rem] xl:left-[10%] xl:top-[20%] xl:w-[28rem]">
        <img
          src="images/bg-card-front.png"
          alt="Front of the Credit Card"
          className="w-full"
        />
        <img
          src="images/card-logo.svg"
          alt="Credit Card Logo"
          className="absolute left-[1.1875rem] top-[1.1rem] w-[3.375rem] xl:left-8 xl:top-7 xl:w-[5.25rem]"
        />
        <span className="absolute left-[1.1875rem] top-[5.25rem] text-lg tracking-[2.2px] text-white xl:left-8 xl:top-[8.6875rem] xl:text-[1.75rem] xl:tracking-[3.42px]">
          {cardNumber
            ? cardNumber.match(/.{1,4}/g).join(" ")
            : "0000 0000 0000 0000"}
        </span>
        <span className="absolute bottom-4 left-[1.1875rem] text-[0.5625rem] tracking-[1.29px] text-white xl:bottom-[1.625rem] xl:left-8 xl:text-sm xl:tracking-[2px]">
          {name ? name.toUpperCase() : "JANE APPLESEED"}
        </span>
        <span className="absolute bottom-4 right-6 text-[0.5625rem] tracking-[1.29px] text-white xl:bottom-[1.625rem] xl:right-8 xl:text-sm xl:tracking-[2px]">
          {monthExp ? monthExp : "00"}/{yearExp ? yearExp : "00"}
        </span>
      </div>
    </div>
  );
};

const CreditCardForm = ({
  nameProps,
  cardNumberProps,
  monthExpProps,
  yearExpProps,
  cvcProps,
  onConfirmClick,
}) => {
  return (
    <form className="mx-6 xl:ml-auto xl:mr-[20%] xl:w-[23.8125rem]">
      <div className="mb-7 grid grid-cols-4 gap-x-2 gap-y-11">
        <InputField
          label="Cardholder Name"
          type="text"
          name="cardholder-name"
          placeholder="e.g. Jane Appleseed"
          containerClassName="col-span-full"
          {...nameProps}
        />
        <InputField
          label="Card Number"
          type="number"
          name="card-number"
          placeholder="e.g. 1234 5678 9123 0000"
          containerClassName="col-span-full"
          {...cardNumberProps}
        />
        <InputField
          label="Exp. Date (MM/YY)"
          type="number"
          name="month"
          placeholder="MM"
          containerClassName="col-span-1"
          {...monthExpProps}
        />
        <InputField
          label=""
          type="number"
          name="year"
          placeholder="YY"
          containerClassName="col-span-1"
          {...yearExpProps}
        />
        <InputField
          label="CVC"
          type="number"
          name="cvc"
          placeholder="e.g. 123"
          containerClassName="col-span-2"
          {...cvcProps}
        />
      </div>
      <Button onConfirmClick={onConfirmClick}>Confirm</Button>
    </form>
  );
};

const Button = ({ onConfirmClick, children }) => {
  return (
    <button
      onClick={onConfirmClick}
      className="h-[3.3125rem] w-full rounded-lg bg-deep-violet text-lg text-white"
    >
      {children}
    </button>
  );
};

const ThankYou = () => {
  return (
    <div className="mx-6 text-center xl:ml-auto xl:mr-[20%] xl:w-[23.8125rem]">
      <img
        src="images/icon-complete.svg"
        alt="Complete Icon"
        className="mx-auto mb-[2.1875rem] w-20"
      />
      <p className="mb-4 text-[1.75rem] uppercase tracking-[3.42px] text-deep-violet">
        Thank You!
      </p>
      <p className="mb-12 text-lg text-purplish-grey">
        We’ve added your card details
      </p>
      <Button>Continue</Button>
    </div>
  );
};

const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  errorMsg,
  containerClassName,
  labelClassName,
  inputClassName,
  ...rest
}) => {
  return (
    <div className={`relative flex flex-col ${containerClassName}`}>
      <label
        className={`absolute -top-5 whitespace-nowrap text-xs uppercase tracking-[2px] ${labelClassName}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${
          errorMsg ? "border-red" : "border-light-grey"
        } focus:outline-violet h-[2.8125rem] rounded-lg border-[1px] pl-4 placeholder:text-lg placeholder:text-deep-violet placeholder:opacity-25 ${inputClassName}`}
        {...rest}
      />
      {errorMsg && <span className="mt-2 text-xs text-red">{errorMsg}</span>}
    </div>
  );
};

export default App;
