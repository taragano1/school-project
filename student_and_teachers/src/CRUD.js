let serverPath = "http://localhost:5000";


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

  console.log("AddPassword: ", fullpath);

  return fetch(fullpath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Obj),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Password added successfully");
      }
      return response.json();
    })
    .then((data) => {
      return data;
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
