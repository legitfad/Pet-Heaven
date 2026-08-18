const REQUEST_KEY = "petHeavenRequests";

export function getRequests() {
  try {
    const saved = localStorage.getItem(REQUEST_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveRequests(requests) {
  localStorage.setItem(REQUEST_KEY, JSON.stringify(requests));
}

export function addRequest(request) {
  const requests = getRequests();
  const newRequest = {
    id: Date.now(),
    status: "New",
    date: new Date().toLocaleDateString(),
    type: request.type,
    petName: request.petName,
    petType: request.petType,
    applicantName: request.applicantName,
    email: request.email,
    phone: request.phone,
    notes: request.notes,
  };

  requests.unshift(newRequest);
  saveRequests(requests);
}
