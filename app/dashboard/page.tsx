"use client";

import { useState } from "react";

type Mail = {
  id: number;
  subject: string;
  sender: string;
  folder: "inbox" | "sent";
  important?: boolean;
};

export default function Dashboard() {
  const initialMails: Mail[] = [
    { id: 1, subject: "Welcome to MailFlow", sender: "admin@mailflow.com", folder: "inbox" },

    { id: 2, subject: "Assignment Update", sender: "mentor@mailflow.com", folder: "inbox" },

    { id: 3, subject: "Meeting Reminder", sender: "team@mailflow.com", folder: "sent" },
    
    { id: 4, subject: "Project Review", sender: "review@mailflow.com", folder: "sent" },
  ];

  const [mails, setMails] = useState(initialMails);
  const [selected, setSelected] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");

  const toggleMail = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setMails(mails.filter((mail) => !selected.includes(mail.id)));
    setSelected([]);
  };

  const markImportant = () => {
    setMails(
      mails.map((mail) =>
        selected.includes(mail.id)
          ? { ...mail, important: true }
          : mail
      )
    );
    setSelected([]);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>MailFlow</h3>

        <p onClick={() => setActiveTab("inbox")}>Inbox</p>
        <p onClick={() => setActiveTab("sent")}>Sent</p>
      </aside>

      {/* Main Area */}
      <main className="mail-area">
        <h1>Mail Dashboard</h1>
        <p className="sub">Manage your emails below:</p>

        {/* Actions */}
        <div className="actions">
          <button onClick={markImportant}>Mark Important</button>
          <button onClick={deleteSelected}>Delete</button>
        </div>

        {/* Mail List */}
        {mails
          .filter((mail) => mail.folder === activeTab)
          .map((mail) => (
            <div key={mail.id} className="mail-card">
              <input
                type="checkbox"
                checked={selected.includes(mail.id)}
                onChange={() => toggleMail(mail.id)}
              />

              <div>
                <p className="subject">
                  {mail.subject} {mail.important && "(Important)"}
                </p>
                <p className="sender">{mail.sender}</p>
              </div>
            </div>
          ))}

        <p className="count">Selected mails: {selected.length}</p>
      </main>
    </div>
  );
}
