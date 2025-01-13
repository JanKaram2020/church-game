"use client";
import useGame from "./use-game";
import Settings from "./settings";
import Image from "next/image";

function Game() {
  const {
    resetGame,
    displayedNumber,
    numbers,
    choices,
    isNumbersDisabled,
    isChoicesDisabled,
    displayedChoice,
    spinNumbers,
    spinChoices,
    choicesLeft,
    isSpinning,
    changeValues,
  } = useGame();

  return (
    <div className="h-screen w-screen bg-[url('/img.png')] bg-no-repeat bg-cover bg-bottom flex flex-col items-center justify-center">
      <div
        className={
          "absolute top-0 left-0 w-screen h-screen backdrop-blur-[5px] z-10"
        }
      ></div>
      <Image
        src={"/logo.png"}
        width={"200"}
        height={"200"}
        className={"z-40 ml-[-30px]"}
        alt={"Youth meeting's logo"}
      />
      <div
        className={
          "flex flex-col items-center justify-center text-white relative bg-gradient-to-r from-[rgba(0,0,0,0.3)] to-blue-500 z-40 backdrop-blur-sm rounded-2xl p-10"
        }
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-8">
          باركت طبيعتي فيك
        </h1>
        <h2 className="text-4xl font-bold mb-8">حفلة عيد الميلاد ٢٠٢٥</h2>

        <div
          className={`flex flex-col items-center justify-center w-64 h-64 rounded-full border-4 bg-gray-800 text-center text-2xl font-bold ${isSpinning ? "animate-pulse border-indigo-500" : "border-green-500"}`}
        >
          <div
            className={`${displayedNumber !== null ? "text-4xl" : "text-8xl"}`}
          >
            {displayedNumber !== null ? displayedNumber : "🎰"}
          </div>
          <div className="text-2xl mt-2">{displayedChoice || ""}</div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <div className={"flex flex-row gap-4"}>
            <button
              onClick={spinNumbers}
              disabled={isNumbersDisabled}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded disabled:opacity-80 w-36 h-12"
            >
              {isSpinning
                ? "جاري التغيير .."
                : numbers.length === 0
                  ? "No More Numbers"
                  : "غير الرقم"}
            </button>
            <button
              onClick={spinChoices}
              disabled={isChoicesDisabled}
              className="el-messiri-400 px-6 py-3 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded disabled:opacity-80 w-36 h-12"
            >
              {isSpinning
                ? "جاري التغيير .."
                : choicesLeft === 0
                  ? "No More Choices"
                  : "غير النوع"}
            </button>
          </div>
          <Settings
            initialCount={numbers.length}
            initialChoices={choices}
            changeValues={changeValues}
            resetGame={resetGame}
            choicesLeft={choicesLeft}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
