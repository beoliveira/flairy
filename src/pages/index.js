import Head from "next/head";
import Button from "@/components/Button";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { language_options } from "../utils/language-options";

export default function Home() {

  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(1);
  const [buttonText, setButtonText] = useState('Write my story!');

  // This function is called when the form is submitted
  async function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    setLoading(true); // Sets the loading state to true

    // Get the values of the form fields
    const name = document.getElementById('form-name').value;
    const age = document.getElementById('form-age').value;
    const gender = document.getElementById('form-gender').value;
    const setting = document.getElementById('form-setting').value;
    const language = selectedOption;

    // Create a data object with the form field values
    const data = {
      name,
      age,
      gender,
      setting,
      language,
    };

    console.log("Sending data: " + JSON.stringify(data)); // Log the data that will be sent to the server

    try {
      // Send a POST request to the server with the data
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      // Parse the response body as JSON
      const responseData = await response.json();

      // Set the result state with the message received from the server
      setResult(responseData.message);

      console.log(responseData.message); // Log the message received from the server
    } catch (error) {
      console.error(error); // Log any errors that occur during the request
    }

    setLoading(false); // Sets the loading state to false when the request is complete
  };

  // This effect is called whenever the loading state changes
  useEffect(() => {
    let intervalId; // Stores the ID of the interval timer for the dots animation
    let timeoutId; // Stores the ID of the timeout timer for the "Still working on it" text

    if (loading) { // If the loading state is true
      const name = document.getElementById('form-name').value;
      setButtonText('Writing a special story for ' + name); // Set the button text to "Writing a special story for {name}"
      intervalId = setInterval(() => { // Start an interval timer to animate the dots
        setDots((dots) => (dots % 3) + 1);
      }, 500);

      timeoutId = setTimeout(() => { // Start a timeout timer to change the button text to "Still working on it" after 10 seconds
        setButtonText('Still working on it');
      }, 10000);
    } else { // If the loading state is false
      setDots(1); // Reset the dots animation to one dot
      setButtonText('Write my story!'); // Set the button text to "Write my story!"
    }

    return () => { // This function is called when the component is unmounted or when the effect is run again
      clearInterval(intervalId); // Clear the interval timer for the dots animation
      clearTimeout(timeoutId); // Clear the timeout timer for the "Still working on it" text
    };
  }, [loading]); // The effect depends on the loading state variable


  return (
    <>
      <Head>
        <title>Flairy - Magical bedtime stories</title>
        <meta name="description" content="Personalised bedtime stories for your children" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid h-[800px] grid-cols-2 mx-8">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-7xl font-semibold">
            <span className="text-red-400">Unforgettable</span> bedtime stories,{" "}
            <span className="text-red-400">personalised</span> just for your
            child
          </h1>
          <p className="mb-12 text-xl font-light">
            Create a special bedtime routine with a unique story for your child
            every night
          </p>
          <Button>Get started</Button>
        </div>
        <div className="relative -z-10 ml-[-50%]">
          <Image
            className="overflow-clip object-contain"
            role="presentation"
            src="/book.png"
            fill
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col items-center py-12">
        <h2 className="mb-20 text-5xl font-semibold">
          Send Your Child to Dreamland in 3 Easy Steps
        </h2>
        <div className="grid gap-12 md:grid-cols-3 md:gap-24 p-4 mx-8">
          <div>
            <h3 className="mb-5 text-2xl font-semibold text-white">Step 1</h3>
            <p className="mb-2 text-neutral-500">
              Type in your child&apos;s name
            </p>
            <p className="italic text-neutral-500">
              So that they can be the star of the story
            </p>
          </div>
          <div>
            <h3 className="mb-5 text-2xl font-semibold text-white">Step 2</h3>
            <p className="mb-2 text-neutral-500">
              Type in your child&apos;s age and gender
            </p>
            <p className="italic text-neutral-500">
              So that we can provide age and gender-appropriate stories
            </p>
          </div>
          <div>
            <h3 className="mb-5 text-2xl font-semibold text-white">Step 3</h3>
            <p className="mb-2 text-neutral-500">
              Type in the setting where the story will take place
            </p>
            <p className="italic text-neutral-500">
              Let your child&apos;s imagination run wild!
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ FORM ----------------------------------------------------------------- */}

      <div className="flex flex-col items-center py-8">
        <h2 className="mb-10 text-5xl font-semibold">
          Start Here
        </h2>
        <form className="grid gap-4" id="story-form" onSubmit={handleSubmit}>
          <div className="text-center">
            <label className="text-xl font-semibold" htmlFor="form-name">
              What's your child's name?
            </label>
            <input
              id="form-name"
              className="border-none p-2 rounded-none w-full mb-6 mt-2 bg-sky-900/30 h-14 py-4"
              type="text"
              placeholder="input text"
              required
            />
            <label className="mt-2 text-xl font-semibold" htmlFor="age-and-gender">
              What's their age and gender?
            </label>
            <div className="flex items-center mb-6 mt-2">
              <input
                id="form-age"
                className="border-none p-2 rounded-none flex-1 mr-2 bg-sky-900/30 h-14 py-4"
                type="text"
                placeholder="e.g.: 5"
                required
              />
              <select
                id="form-gender"
                className="border-none p-2 rounded-none flex-1 bg-sky-900/30 h-14 py-4"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
              </select>
            </div>
            <label className="text-xl font-semibold" htmlFor="form-setting">
              What's the setting for this bedtime story?
            </label>
            <input
              id="form-setting"
              className="border-none p-2 rounded-none bg-sky-900/30 text-gray w-full mb-6 mt-2 h-14 py-4"
              type="text"
              placeholder="input text"
              required
            />
          </div>
          <div className="flex justify-between mb-6">
            <label className="w-1/2 text-xl font-semibold" htmlFor="form-language">Story Language</label>
            <select className="w-1/2 border-none bg-sky-900/30 h-14 py-4"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              required
            >
              {/* Map over the options to generate the <option> elements */}
              {language_options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full py-4 px-6 text-base font-medium text-gray-900 rounded-full bg-lime-500 transition-opacity hover:opacity-90" disabled={loading}>
            {loading ? buttonText + '.'.repeat(dots) : buttonText}
          </button>
        </form>
        {result !== null && (
          <div id="story-area" className="mt-8 p-4 mx-8 border border-gray-400 rounded-md">
            {result}
          </div>
        )}
      </div>

      {/* -------------------------------------------------------- END FORM --------------------------------------------------------------------- */}

      <div className="flex flex-col items-center py-12 mx-8">
        <h2 className="mb-20 text-5xl font-semibold">
          Make the most of Flairy
        </h2>
        {/* ------------------------------- YOUR PRIVACY ------------------------------- */}
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <Image
              className=" overflow-clip object-contain"
              role="presentation"
              src="/padlock.png"
              fill
              alt=""
            />
          </div>
          <div>
            <h3 className="mb-6 font-medium tracking-widest text-lime-500">
              YOUR PRIVACY
            </h3>
            <h4 className="mb-6 text-4xl font-semibold">
              We do not store any personal data
            </h4>
            <p className="mb-6 text-neutral-500">
              Your child&apos;s privacy is our top priority.
            </p>
            <p className="mb-6 text-neutral-500">
              To create the best possible bedtime stories for your child, we ask
              for some personal information (such as their name, age and
              gender). This information is used solely to generate the best
              possible stories and is not stored by us or shared with any third
              parties.
            </p>
            <p className="mb-6 text-neutral-500">
              OpenAI, the provider of the language model we use, has its own
              privacy policy which you can view here.
            </p>
          </div>
        </div>

        {/* ------------------------------- CREATIIVTY ------------------------------- */}
        <div className="grid md:grid-cols-2">
          <div>
            <h3 className="mb-6 font-medium tracking-widest text-lime-500">
              YOUR PRIVACY
            </h3>
            <h4 className="mb-6 text-4xl font-semibold">
              We do not store any personal data
            </h4>
            <p className="mb-6 text-neutral-500">
              Your child&apos;s privacy is our top priority.
            </p>
            <p className="mb-6 text-neutral-500">
              To create the best possible bedtime stories for your child, we ask
              for some personal information (such as their name, age and
              gender). This information is used solely to generate the best
              possible stories and is not stored by us or shared with any third
              parties.
            </p>
            <p className="mb-6 text-neutral-500">
              OpenAI, the provider of the language model we use, has its own
              privacy policy which you can view here.
            </p>
          </div>
          <div className="relative">
            <Image
              className=" overflow-clip object-contain"
              role="presentation"
              src="/padlock.png"
              fill
              alt=""
            />
          </div>
        </div>

        {/* ------------------------------- INCORPORATING FLAIRY ------------------------------- */}
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <Image
              className="overflow-clip object-contain"
              role="presentation"
              src="/padlock.png"
              fill
              alt=""
            />
          </div>
          <div>
            <h3 className="mb-6 font-medium tracking-widest text-lime-500">
              YOUR PRIVACY
            </h3>
            <h4 className="mb-6 text-4xl font-semibold">
              We do not store any personal data
            </h4>
            <p className="mb-6 text-neutral-500">
              Your child&apos;s privacy is our top priority.
            </p>
            <p className="mb-6 text-neutral-500">
              To create the best possible bedtime stories for your child, we ask
              for some personal information (such as their name, age and
              gender). This information is used solely to generate the best
              possible stories and is not stored by us or shared with any third
              parties.
            </p>
            <p className="mb-6 text-neutral-500">
              OpenAI, the provider of the language model we use, has its own
              privacy policy which you can view here.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
