import { Link } from "react-router-dom";
import { useMember } from "../context/MemberContext.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import Notice from "../components/Notice.jsx";

export default function Employee() {
  const { currentMember } = useMember();
  const [requests, setRequests] = useLocalStorage("petHeavenRequests", []);
  const adoptionRequests = [];
  const releaseRequests = [];
  const contactRequests = [];

  for (let i = 0; i < requests.length; i++) {
    if (requests[i].type === "Adoption") {
      adoptionRequests.push(requests[i]);
    }

    if (requests[i].type === "Release") {
      releaseRequests.push(requests[i]);
    }

    if (requests[i].type === "Contact") {
      contactRequests.push(requests[i]);
    }
  }

  if (!currentMember || currentMember.role !== "employee") {
    return (
      <div className="container section narrow">
        <SectionHeading
          as="h1"
          eyebrow="Employee only"
          title="Please log in as an employee"
          subtitle="This page is only for Pet Heaven staff."
        />
        <Button to="/login">Go to login</Button>
      </div>
    );
  }

  function getDetailFromNotes(notes, label) {
    if (!notes) return "";

    const lines = notes.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const prefix = label + ":";
      if (lines[i].startsWith(prefix)) {
        return lines[i].slice(prefix.length).trim();
      }
    }

    return "";
  }

  function showRequestDetails(request) {
    if (request.type === "Release") {
      const reason = request.reason || getDetailFromNotes(request.notes, "Reason");
      const petAge = request.petAge || getDetailFromNotes(request.notes, "Pet age");
      const health =
        request.health ||
        getDetailFromNotes(request.notes, "Health and temperament");

      return (
        <>
          <p>
            <strong>Name:</strong> {request.applicantName}
          </p>
          <p>
            <strong>Email:</strong> {request.email}
          </p>
          <p>
            <strong>Phone:</strong> {request.phone}
          </p>
          <p>
            <strong>Reason:</strong> {reason || "Not given"}
          </p>
          <p>
            <strong>Pet age:</strong> {petAge || "Not given"}
          </p>
          <p>
            <strong>Health and temperament:</strong> {health || "Not given"}
          </p>
        </>
      );
    }

    return (
      <>
        <p>
          <strong>Name:</strong> {request.applicantName}
        </p>
        <p>
          <strong>Email:</strong> {request.email}
        </p>
        <p>
          <strong>Phone:</strong> {request.phone}
        </p>
        <p>
          <strong>Notes:</strong> {request.notes}
        </p>
      </>
    );
  }

  function updateStatus(id, status) {
    const updated = [];

    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];

      if (request.id === id) {
        updated.push({
          ...request,
          status: status,
        });
      } else {
        updated.push(request);
      }
    }

    setRequests(updated);
  }

  function deleteRequest(id) {
    const updated = [];

    for (let i = 0; i < requests.length; i++) {
      if (requests[i].id !== id) {
        updated.push(requests[i]);
      }
    }

    setRequests(updated);
  }

  function showRequests(title, list) {
    return (
      <section className="employee-section">
        <h2>{title}</h2>

        {list.length === 0 ? (
          <p className="empty-state">No {title.toLowerCase()} yet.</p>
        ) : (
          <div className="request-list">
            {list.map((request) => (
              <div className="request-card" key={request.id}>
                <div>
                  <p className="request-type">{request.type}</p>
                  <h3>{request.petName}</h3>
                  <p className="pet-meta">
                    {request.petType} request sent on {request.date}
                  </p>
                </div>

                <div className="request-details">
                  {showRequestDetails(request)}
                </div>

                <div className="request-actions">
                  <label>
                    Status
                    <select
                      className="control"
                      value={request.status}
                      onChange={(e) => updateStatus(request.id, e.target.value)}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                  </label>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => deleteRequest(request.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <div className="container section">
      <SectionHeading
        as="h1"
        eyebrow="Employee"
        title="Pet request management"
        subtitle="View and update adoption or release requests submitted through the website."
      />

      {requests.length === 0 ? (
        <Notice type="info" title="No requests yet">
          New adoption and release requests will appear here after users submit
          the forms.
        </Notice>
      ) : (
        <>
          {showRequests("Adoption requests", adoptionRequests)}
          {showRequests("Release a pet requests", releaseRequests)}
          {showRequests("Contact messages", contactRequests)}
        </>
      )}

      <p className="form-alt employee-note">
        Employee login example: <strong>staff@petheaven.org.sg</strong>. This is
        a simple demo login for the assignment, not real website security.
      </p>

      <p>
        <Link to="/adopt">Back to pet list</Link>
      </p>
    </div>
  );
}
