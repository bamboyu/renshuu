import { useContext, useEffect, useState } from "react";
import DeckCard from "../../components/Deck/DeckCard";
import { getDecks, createDeck } from "../../api/deckApi";
import { getCardCount } from "../../api/cardApi";
import { AuthContext } from "../../context/AuthContext";

interface Deck {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const Decks = () => {
  const { accessToken, isAuthenticated } = useContext(AuthContext);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cardCounts, setCardCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newDeckName, setNewDeckName] = useState("");
  const [creating, setCreating] = useState(false);

  // Fetch Decks
  useEffect(() => {
    async function fetchDecks() {
      if (!isAuthenticated || !accessToken) return;

      try {
        setLoading(true);
        const data = await getDecks();
        setDecks(data);

        // Fetch counts
        const counts: Record<string, number> = {};
        const countPromises = data.map(async (deck: any) => {
          try {
            const count = await getCardCount(deck._id, accessToken);
            counts[deck._id] = count;
          } catch (e) {
            counts[deck._id] = 0;
          }
        });

        await Promise.all(countPromises);
        setCardCounts(counts);
      } catch (err) {
        console.error("Error fetching decks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDecks();
  }, [isAuthenticated, accessToken]);

  // Open Modal
  const openCreateModal = () => {
    setNewDeckName(""); // Clear previous input
    setShowModal(true);
  };

  // Submit New Deck
  const handleSubmitDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckName.trim() || !accessToken) return;

    try {
      setCreating(true);
      const newDeck = await createDeck(accessToken, newDeckName);

      setDecks((prev) => [...prev, newDeck]);
      setCardCounts((prev) => ({ ...prev, [newDeck._id]: 0 }));

      setShowModal(false); // Close modal
    } catch (err) {
      console.error("Error creating deck:", err);
      alert("Failed to create deck.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">Your Decks</h2>
        <button onClick={openCreateModal} className="btn btn-primary">
          + Create New Deck
        </button>
      </div>

      {loading && decks.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh", color: "white" }}
        >
          Loading...
        </div>
      ) : (
        <div className="row">
          {decks.length === 0 ? (
            <div className="text-white-50 text-center mt-5">
              <h4>No decks found.</h4>
              <p>Create your first deck to get started!</p>
            </div>
          ) : (
            decks.map((deck) => (
              <div key={deck._id} className="mb-2">
                <DeckCard deck={deck} cardCount={cardCounts[deck._id] || 0} />
              </div>
            ))
          )}
        </div>
      )}

      {/* --- CUSTOM MODAL --- */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title">Create New Deck</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmitDeck}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Deck Name</label>
                    <input
                      type="text"
                      className="form-control bg-white text-black border-secondary"
                      placeholder="e.g., Japanese Vocabulary"
                      value={newDeckName}
                      onChange={(e) => setNewDeckName(e.target.value)}
                      autoFocus
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={creating}
                  >
                    {creating ? "Creating..." : "Create Deck"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Decks;
