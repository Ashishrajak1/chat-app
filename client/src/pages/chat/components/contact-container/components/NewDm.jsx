import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HOST } from "@/utils/constants";
import { CiUser } from "react-icons/ci";
import { IoPersonAddOutline } from "react-icons/io5";
import apiClient from "@/lib/api-client.js"; // Ensure this is correctly imported
import { SEARCH_CONTACT_ROUTE } from "@/utils/constants.js"; // Ensure correct route

function NewDm() {
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const [searchContact, setSearchContact] = useState([]); // Now used to store API response

  useEffect(() => {
    const fetchContacts = async () => {
      console.log("colled");
      if (!searchTerms.trim()) return; // Avoid unnecessary API calls for empty input

      try {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerms },
          { withCredentials: true }
        );
        setSearchContact(response.data.users); // Store fetched contacts
        console.log(response);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [searchTerms]);

  return (
    <>
      <div
        onClick={() => setOpenNewContactModel(true)}
        className="h-[10vh] flex items-center px-3 py-2 sm:px-6 md:px-8 mb-4 gap-3 sm:gap-6 cursor-pointer">
        <div className="flex-1 flex items-center gap-5 bg-[#2a2b33] rounded-md px-3 sm:px-4 h-full">
          <IoPersonAddOutline className="text-lg text-[#d84c10] font-bold" />
          <div className="font-medium">New Chat</div>
        </div>
      </div>

      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-700">
              Please select a contact
            </DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <input
              type="text"
              name="Search"
              value={searchTerms}
              onChange={(event) => setSearchTerms(event.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Search contacts"
            />
          </div>

          <ul className="my-4 space-y-3">
            {searchContact.length > 0 ? (
              searchContact.map((contact, index) => (
                <li key={index}>
                  {/* <button className="flex items-center w-full p-3 text-base font-bold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                    🦊 <span className="ml-3">{contact.firstName}</span>
                  </button> */}

                  <div className="flex items-center w-full p-3 text-base font-bold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                    <div className="flex items-center w-full">
                      <div
                        onClick={() => Navigate("/profile")}
                        className="flex items-center gap-5">
                        {contact.image ? (
                          <section className="flex justify-center items-center shadow-md hover:cursor-pointer hover:scale-110 duration-300">
                            <img
                              src={`${HOST}/${contact.image}`}
                              alt="Profile"
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                            />
                          </section>
                        ) : (
                          <section className="flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
                            <CiUser className="text-3xl fill-gray-700" />
                          </section>
                        )}
                        <section>
                          <div className="font-medium text-gray-700">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-gray-700 font-semibold text-xs">
                            {contact.email}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 dark:text-gray-400 text-center">
                <div className="flex-1 md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
                  <div className="text-opacity-80 text-white flex flex-col gap-10 items-center mt-2 lg:text-4xl text-3xl transition-all duration-300 text-center ">
                    <div className="w-32 h-32 relative flex items-center justify-center ">
                      <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse"></div>

                      <div className="w-full h-full relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm"></div>

                        <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                          <div className="flex gap-1 items-center">
                            <div className="w-1.5 h-12 bg-cyan-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"></div>
                            <div className="w-1.5 h-12 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]"></div>
                            <div className="w-1.5 h-12 bg-indigo-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"></div>
                            <div className="w-1.5 h-12 bg-purple-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]"></div>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
                        </div>
                      </div>

                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"></div>
                    </div>
                    <h3 className="poppins-medium text-gray-700 text-lg">
                      H<span className="text-purple-500">i</span> Welcome to
                      <span className="text-purple-500"> codesync </span> Chat
                      App
                      <span className="text-purple-500">.</span>
                    </h3>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewDm;
