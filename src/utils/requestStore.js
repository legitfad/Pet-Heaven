const REQUEST_KEY = "petHeavenRequests";

function getRequests() {
  try {
    const saved = localStorage.getItem(REQUEST_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveRequests(requests) {
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
    petBreed: request.petBreed,
    applicantName: request.applicantName,
    email: request.email,
    phone: request.phone,
    address: request.address,
    housing: request.housing,
    hasPets: request.hasPets,
    agreedToInterview: request.agreedToInterview,
    notes: request.notes,
    reason: request.reason,
    petAge: request.petAge,
    health: request.health,
  };

  requests.unshift(newRequest);
  saveRequests(requests);
}
