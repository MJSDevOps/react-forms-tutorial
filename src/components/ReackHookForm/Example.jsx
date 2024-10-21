import { useForm } from "react-hook-form";
import "./example.css";

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      // TODO: Implement success handling (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error:', error.message);
      // TODO: Implement error handling (e.g., show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="hook">
      <label className="hook__text">First Name</label>
      <input
        type="text"
        className="hook__input"
        {...register("firstName", { required: true })}
      />
      {errors.firstName && (
        <p className="hook__error">First name is required</p>
      )}

      <label className="hook__text">Last Name</label>
      <input
        type="text"
        className="hook__input"
        {...register("lastName", { required: true })}
      />
      {errors.lastName && (
        <p className="hook__error">Last name is required</p>
      )}

      <label className="hook__text">Email</label>
      <input
        type="email"
        className="hook__input"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && (
        <p className="hook__error">Email is required and must be valid</p>
      )}

      <label className="hook__text">Discount Code</label>
      <input
        type="text"
        className="hook__input"
        {...register("discountCode")}
      />

      <button className="hook__button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default RegistrationForm;
