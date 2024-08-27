let serverPath = "http://localhost:8000";


export function Read(query) {
  let fullpath = serverPath + query;
  return fetch(fullpath)
    .then((respones) => respones.json())
    .then((json) => {
      return json;
    });
}

export function Add(serverAddress, Obj) {
  let fullpath = serverPath + serverAddress;
  
  console.log( fullpath);
  console.log( Obj);
  console.log("Sending object:", JSON.stringify(Obj));

  return fetch(fullpath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Obj),
  })
    .then((response) => {
      console.log("Response received:", response);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      
      return response.json();
    })
    .then((data) => {
      console.log(serverAddress + " added successfully:", data);
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error; // ניתן לזרוק את השגיאה כדי לטפל בה במקום אחר אם צריך
    });
}



export function Update(query, updatedData) {
  let fullpath = serverPath + query;
  return fetch(fullpath, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}

export function UpdateFeedback(lessonId, feedback) {
  const query = `/lesson/${lessonId}/feedback`;
  return fetch(serverPath + query, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ feedback }),
  })
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}


export function Delete(serverAddress) {
  let fullpath = serverPath + serverAddress;
  console.log("Delete: ", fullpath);
  return fetch(fullpath, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("delete Succses");
      }
      return response.json();
    })
    .then((json) => {
      return json;
    });
}
