import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("/api/user")
      .then((data) => {
        setName(data.data.userName);
      })
      .catch((error) => {
        if (error?.response?.data?.status === "failed") {
          router.push("/login");
        }
        console.log(error.response.data.status);
      });
  }, [router]);

  const logOutHandler = async () => {
    const res = await axios.get("/api/auth/logout");
    console.log(res);
    router.replace("/login");
  };

  if (!name) {
    return (
      <div className={"container"}>
        <h1>LOADING...</h1>
      </div>
    );
  }

  return (
    <div className={"container"}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ marginBottom: "2rem" }}> Hello mr {name && name} </h1>

        <button className="homeBtn" onClick={logOutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Index;
