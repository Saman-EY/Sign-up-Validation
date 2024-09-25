import Link from "next/link";
import { notify } from "@/utils/Toastify";
import { Validate } from "@/utils/Validate";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";

function Signup() {
  let [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });

  let [errors, setErrors] = useState({});
  let [touched, setTouched] = useState({});

  const [loadingReq, setLoadingReq] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setErrors(Validate(dataForm, "Register"));
  }, [dataForm]);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await axios.get("/api/user");

        console.log(res);
        router.replace("/");
      } catch (error) {
        console.log(error.response.data.message);
      }
    }

    checkLogin();
  }, [router]);

  let changeHandler = (e) => {
    if (e.target.name === "isAccepted") {
      setDataForm({ ...dataForm, [e.target.name]: e.target.checked });
    } else {
      setDataForm({
        ...dataForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  let focusHandler = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  let submitHandler = async (e) => {
    e.preventDefault();
    setLoadingReq(true);
    if (!Object.keys(errors).length) {
      try {
        const res = await axios.post("/api/auth/signup", {
          name: dataForm.name,
          email: dataForm.email,
          password: dataForm.password,
        });

        notify("success", "You registered sucssesfuly");
        console.log(res);
        setTimeout(() => {
          router.replace("/");
        }, 1500);
      } catch (error) {
        console.log(error);
        console.log(error.response.data);
        notify("error", error.response.data.message);
      }
    } else {
      notify("error", "Invalid data");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
    }
    setLoadingReq(false);
  };

  return (
    <div className={"container"}>
      <form className={"form"} onSubmit={submitHandler}>
        <h2>Sign Up</h2>
        <div className={"formField"}>
          <label>Name</label>
          <input
            className={errors.name && touched.name ? "invalid" : "formInput"}
            type="text"
            name="name"
            value={dataForm.name}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.name && touched.name && <span>{errors.name}</span>}
        </div>
        <div className={"formField"}>
          <label>Email</label>
          <input
            className={errors.email && touched.email ? "invalid" : "formInput"}
            type="email"
            name="email"
            value={dataForm.email}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.email && touched.email && <span>{errors.email}</span>}
        </div>
        <div className={"formField"}>
          <label>Password</label>
          <input
            className={
              errors.password && touched.password ? "invalid" : "formInput"
            }
            type="password"
            name="password"
            value={dataForm.password}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.password && touched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <div className={"formField"}>
          <label>Confirm Password</label>
          <input
            className={
              errors.confirmPassword && touched.confirmPassword
                ? "invalid"
                : "formInput"
            }
            type="password"
            name="confirmPassword"
            value={dataForm.confirmPassword}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span>{errors.confirmPassword}</span>
          )}
        </div>
        <div className={"formField"}>
          <div className={"checkbox"}>
            <label>I accept terms of privacy policy</label>
            <input
              type="checkbox"
              name="isAccepted"
              value={dataForm.isAccepted}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
          </div>
          {errors.isAccepted && touched.isAccepted && (
            <span>{errors.isAccepted}</span>
          )}
        </div>

        <div className={"Buttons"}>
          <Link href="/login">Login</Link>

          {!loadingReq ? (
            <button type="submit">Sign Up</button>
          ) : (
            <button style={{ opacity: ".5", pointerEvents: "none" }}>
              Processing...
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
