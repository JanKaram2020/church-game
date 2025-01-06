import React, { useState } from "react";
import type { Choice } from "./use-game";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const getRandomId = () => Math.random().toString(36).substring(2, 5);

type SettingsType = {
  choicesLeft: number;
  initialCount: number;
  initialChoices: Choice[];
  resetGame: () => void;
  changeValues: ({
    numbers,
    choices,
  }: {
    numbers: number;
    choices: Choice[];
  }) => void;
};
const SettingsForm = ({
  initialCount,
  initialChoices,
  changeValues,
  resetGame,
  closeModal,
  isModalOpen,
  onOpenChange,
  choicesLeft,
}: SettingsType & {
  isModalOpen: boolean;
  closeModal: () => void;
  onOpenChange: (v: boolean) => void;
}) => {
  const [formState, setFormState] = useState({
    count: initialCount,
    choices: initialChoices.map((c, i) => ({ ...c, id: getRandomId() + i })),
  });
  const [editing, setEditing] = useState(false);
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
        <DialogContent className={"max-w-3xl"}>
          <DialogHeader>
            <DialogTitle>
              <span className={"text-2xl"}>الاعدادات</span>
            </DialogTitle>
            <DialogDescription>
              لتغيير عدد الاشخاص او اعادة اللعبة من الاول او عشان نشوف فاضل قد
              ايه
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="py-6 rounded"
          >
            <fieldset disabled={!editing}>
              <div className="mb-4 flex flex-col">
                <h5 className={"text-xl"}>العدد</h5>
                <Input
                  id="numbers"
                  name="numbers"
                  type={"number"}
                  value={formState.count}
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      count: +e.target.value,
                    });
                  }}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded"
                />
              </div>
              <hr />
              <h5 className={"text-xl my-2"}>الانواع</h5>
              <ScrollArea
                className={"flex flex-col max-h-[50vh] overflow-y-scroll"}
              >
                {formState.choices.map((choice, index) => (
                  <li
                    key={choice.id}
                    className="mb-4 flex items-center justify-center gap-2 w-fit"
                    dir={"rtl"}
                  >
                    <label
                      htmlFor={`choice-name-${index}`}
                      className="block text-sm font-bold mb-2"
                    >
                      النوع:
                    </label>
                    <Input
                      id={`choice-name-${index}`}
                      name={`choice-name-${index}`}
                      value={choice.name}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          choices: formState.choices.map((c) => {
                            if (c.id === choice.id) {
                              return { ...c, name: e.target.value };
                            }
                            return c;
                          }),
                        });
                      }}
                      required={true}
                      className="w-full lg:min-w-80 px-3 py-2 bg-gray-700 text-white rounded mb-2"
                    />

                    <label
                      htmlFor={`choice-count-${index}`}
                      className="block text-sm font-bold mb-2"
                    >
                      العدد:
                    </label>
                    <Input
                      className="px-3 py-2 bg-gray-700 text-white rounded"
                      id={`choice-count-${index}`}
                      name={`choice-count-${index}`}
                      type="number"
                      required={true}
                      value={choice.count}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          choices: formState.choices.map((c) => {
                            if (c.id === choice.id) {
                              return { ...c, count: +e.target.value };
                            }
                            return c;
                          }),
                        });
                      }}
                    />
                    <Button
                      variant={"destructive"}
                      type={"button"}
                      onClick={() => {
                        setFormState({
                          ...formState,
                          choices: formState.choices.filter(
                            (c) => c.id !== choice.id,
                          ),
                        });
                      }}
                    >
                      مسح X
                    </Button>
                  </li>
                ))}
              </ScrollArea>
              <Button
                type={"button"}
                onClick={() => {
                  setFormState({
                    ...formState,
                    choices: [
                      ...formState.choices,
                      {
                        name: "",
                        count: 1,
                        id: getRandomId() + (formState.choices.length + 1),
                      },
                    ],
                  });
                }}
              >
                زود نوع +
              </Button>
              <p>فاضل {choicesLeft} اختيار</p>
            </fieldset>
          </form>

          <DialogFooter className={"gap-2"}>
            <Button
              variant={"destructive"}
              type={"button"}
              onClick={() => {
                resetGame();
                closeModal();
              }}
            >
              Factory Reset Game
            </Button>
            <Button
              variant={"destructive"}
              type={"button"}
              onClick={() => {
                setFormState({
                  count: initialCount,
                  choices: initialChoices.map((c, i) => ({
                    ...c,
                    id: getRandomId() + i,
                  })),
                });
              }}
            >
              اعادة لقبل التعديلات
            </Button>
            <Button
              variant={"outline"}
              type={"button"}
              onClick={() => {
                resetGame();
                closeModal();
              }}
            >
              الغاء
            </Button>
            <Button
              variant={"secondary"}
              type={"button"}
              className={"bg-green-400"}
              onClick={() => {
                changeValues({
                  numbers: formState.count,
                  choices: formState.choices.map((c) => ({
                    name: c.name,
                    count: c.count,
                  })),
                });
                closeModal();
              }}
            >
              حفظ
            </Button>
            <Button
              variant={"outline"}
              type={"button"}
              onClick={() => {
                setEditing((p) => !p);
              }}
            >
              {editing ? "وضع القراءة" : "وضع التعديل"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Settings = (props: SettingsType) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="flex justify-center items-center px-6 py-3 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded disabled:opacity-80 text-center h-12 gap-2"
      >
        <div className={"w-6"}>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 489.802 489.802"
          >
            <g>
              <path
                d="M20.701,281.901l32.1,0.2c4.8,24.7,14.3,48.7,28.7,70.5l-22.8,22.6c-8.2,8.1-8.2,21.2-0.2,29.4l24.6,24.9
    c8.1,8.2,21.2,8.2,29.4,0.2l22.8-22.6c21.6,14.6,45.5,24.5,70.2,29.5l-0.2,32.1c-0.1,11.5,9.2,20.8,20.7,20.9l35,0.2
    c11.5,0.1,20.8-9.2,20.9-20.7l0.2-32.1c24.7-4.8,48.7-14.3,70.5-28.7l22.6,22.8c8.1,8.2,21.2,8.2,29.4,0.2l24.9-24.6
    c8.2-8.1,8.2-21.2,0.2-29.4l-22.6-22.8c14.6-21.6,24.5-45.5,29.5-70.2l32.1,0.2c11.5,0.1,20.8-9.2,20.9-20.7l0.2-35
    c0.1-11.5-9.2-20.8-20.7-20.9l-32.1-0.2c-4.8-24.7-14.3-48.7-28.7-70.5l22.8-22.6c8.2-8.1,8.2-21.2,0.2-29.4l-24.6-24.9
    c-8.1-8.2-21.2-8.2-29.4-0.2l-22.8,22.6c-21.6-14.6-45.5-24.5-70.2-29.5l0.2-32.1c0.1-11.5-9.2-20.8-20.7-20.9l-35-0.2
    c-11.5-0.1-20.8,9.2-20.9,20.7l-0.3,32.1c-24.8,4.8-48.8,14.3-70.5,28.7l-22.6-22.8c-8.1-8.2-21.2-8.2-29.4-0.2l-24.8,24.6
    c-8.2,8.1-8.2,21.2-0.2,29.4l22.6,22.8c-14.6,21.6-24.5,45.5-29.5,70.2l-32.1-0.2c-11.5-0.1-20.8,9.2-20.9,20.7l-0.2,35
    C-0.099,272.401,9.201,281.801,20.701,281.901z M179.301,178.601c36.6-36.2,95.5-35.9,131.7,0.7s35.9,95.5-0.7,131.7
    s-95.5,35.9-131.7-0.7S142.701,214.801,179.301,178.601z"
                fill="currentColor"
              />
            </g>
          </svg>
        </div>
        <span>الاعدادات</span>
      </button>
      <SettingsForm
        key={String(isModalOpen)}
        {...props}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Settings;
