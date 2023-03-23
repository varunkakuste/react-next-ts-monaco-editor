import React, { useState } from "react";
import EditorPanel from "./EditorPanel";
import LanguagePanel, { languageOptions } from "./LanguagePanel";
import OutputPanel from "./OutputPanel";
import ThemePanel, { themeOptions } from "./ThemePanel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputPanel from "./InputPanel";
import QuestionPanel from "./QuestionPanel";
import ResourceUtilization from "./ResourceUtilization";

const defaultQuestion = `Write a program to add 2 numbers, print addition result, user's id & name. 
    Please note: take required inputs from the Input section.`;

const defaultQuestionsJavaBoilerPlateCode = `import java.util.*;
class MyClass {
    public void addAndPrint(int x, int y, String userName, int id) {
        // implement me
    }
}

public class Main {
    public static void main(String args[]) {
        // implement me
    }
}`;

function CodeEditor(props: any) {
  const [language, setLanguage] = useState(languageOptions[2]);
  const [theme, setTheme] = useState(themeOptions[1]);
  const [code, setCode] = useState(defaultQuestionsJavaBoilerPlateCode);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState(defaultQuestion);

  function handleSelectedLanguage(selectedLanguage: any) {
    alert(selectedLanguage.id);
    alert(selectedLanguage.value);
    console.log(selectedLanguage);
    setLanguage(selectedLanguage);
  }

  function handleSelectedTheme(selectedTheme: any) {
    setTheme(selectedTheme);
  }

  function handleCodeEditorChange(operation: string, value: string) {
    if ("code" === operation) {
      setCode(value);
    }
  }

  function handleCompile() {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(input),
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        console.log("err.data", err);

        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
          showErrorToast(
            `Quota of 50 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  }

  async function checkStatus(token: any) {
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast("Compiled Successfully", 3000);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast("Something went wrong! Please try again.", 3000);
    }
  }

  function showSuccessToast(msg: string, timer: number) {
    toast.success(msg || "Compiled Successfully!", {
      position: "bottom-right",
      autoClose: timer ? timer : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function showErrorToast(msg: string, timer: number) {
    toast.error(msg || "Something went wrong! Please try again.", {
      position: "bottom-right",
      autoClose: timer ? timer : 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="container text-left">
        <div className="row">
          <div className="col">
            <LanguagePanel onLanguageSelection={handleSelectedLanguage} />
          </div>
          <div className="col">
            <ThemePanel onThemeSelection={handleSelectedTheme} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <QuestionPanel question={question} />
          </div>
          <div className="col">
            <EditorPanel
              language={language?.value}
              theme={theme.value}
              code={code}
              onCodeEditorChange={handleCodeEditorChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <InputPanel input={input} setInput={setInput} />
          </div>
          <div className="col">
            <OutputPanel outputDetails={outputDetails} />
          </div>
        </div>

        <div className="row">
          <div className="col">{""}</div>
          <div className="col">
            {outputDetails && (
              <ResourceUtilization resourceUtilization={outputDetails} />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col">{""}</div>
          <div className="col align-self-end">
            <button
              className="btn btn-primary"
              onClick={handleCompile}
              disabled={!code}
            >
              {processing ? "Processing..." : "Compile & Run"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
