"use client"

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
//import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
//import { Button } from "@/components/ui/button";

const supabase = createClient();

export function userEdit({change}: {change: any}) {
    const [phone, setPhone] = useState(change.phone_number);
    const [date, setDate] = useState(change.date_of_birth);
  
    const handleEdit = async () => {
      const { error } = await supabase
        .from("users")
        .update({ phone, date })
        .eq("id", change.user_id);
  
      if (error) {
        console.error("Error updating record:", error.message);
      } else {
        console.log("Record updated successfully!");
      
      }
    };

/*
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500">Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <div style={{ marginBottom: "20px" }}>
              <label>Title: {title ?? "NO title"}</label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>
                Priority
                <input
                  style={{ marginLeft: "5px" }}
                  type="number"
                  min="0"
                  max="5"
                  value={priority || 0}
                  onChange={(e) => setPriority(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label>
                Done
                <input
                  style={{ marginLeft: "5px" }}
                  type="checkbox"
                  checked={done}
                  onChange={(e) => setDone(e.target.checked)}
                />
              </label>
            </div>
            <Button className="bg-green-500" onClick={handleEdit}>
              Save Changes
            </Button>
          </DialogContent>
        </Dialog>
      );*/
}
