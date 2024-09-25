import Link from "next/link";
import { notify } from "@/utils/Toastify";
import { Validate } from "@/utils/Validate";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";

function Login() {
  let [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  let [errors, setErrors] = useState({});
  let [touched, setTouched] = useState({});
  const [loadingReq, setLoadingReq] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setErrors(Validate(dataForm, "Login"));
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
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
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
        const res = await axios.post("/api/auth/login", {
          email: dataForm.email,
          password: dataForm.password,
        });

        notify("success", "You loged in sucssesfuly");
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
      notify("error", "Invalid dataForm");
      setTouched({
        email: true,
        password: true,
      });
    }

    setLoadingReq(false);
  };

  return (
    <div className={"container"}>
      <form className={"form"} onSubmit={submitHandler}>
        <h2>Login</h2>

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
        <div className={"Buttons"}>
          <Link href="/signup">Sign up</Link>
          {loadingReq ? (
            <button
              style={{ opacity: ".5", pointerEvents: "none" }}
              type="submit"
            >
              Processing...
            </button>
          ) : (
            <button type="submit">Login</button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
