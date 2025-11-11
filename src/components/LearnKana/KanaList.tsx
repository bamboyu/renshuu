import { useEffect, useState } from "react";

export interface KanaItem {
  kana: string;
  romaji: string;
  group: string; // row name (a, ka, sa...)
}

export interface KanaProps {
  items: KanaItem[];
  onSelectionChange: (item: KanaItem[]) => void;
}

const Kana = ({ items, onSelectionChange }: KanaProps) => {
  // State to track which groups are checked
  const [checkedGroups, setCheckedGroups] = useState<Record<string, boolean>>(
    {}
  );

  // Effect to notify parent component of selection changes
  useEffect(() => {
    const selectedItems: KanaItem[] = items.filter(
      (item) => checkedGroups[item.group]
    );
    onSelectionChange(selectedItems);
    // Notify parent component of selection change
  }, [checkedGroups, items]);

  // Handle checkbox toggle
  const handleCheckboxChange = (group: string) => {
    setCheckedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  // Handle "Check All" button
  const handleCheckAll = () => {
    const allChecked: Record<string, boolean> = {};
    items.forEach((item) => {
      allChecked[item.group] = true;
    });
    setCheckedGroups(allChecked);
  };

  // Handle "Uncheck All" button
  const handleUncheckAll = () => {
    setCheckedGroups({});
  };

  // Group kana by their group (row)
  const groupedKana = items.reduce<Record<string, KanaItem[]>>((acc, kana) => {
    if (!acc[kana.group]) acc[kana.group] = [];
    acc[kana.group].push(kana);
    return acc;
  }, {});

  // Render the kana items
  return (
    <div className="kana-component">
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleCheckAll} style={{ marginRight: "0.5rem" }}>
          Check All
        </button>
        <button onClick={handleUncheckAll}>Uncheck All</button>
      </div>
      <div className="kana-container">
        {Object.entries(groupedKana).map(([group, kanaList]) => (
          <div key={group} className="kana-group">
            <div className="kana-checkbox-container">
              <label>
                <input
                  type="checkbox"
                  checked={!!checkedGroups[group]}
                  onChange={() => handleCheckboxChange(group)}
                  className="kana-checkbox"
                />
              </label>
            </div>
            <div className="kana-row">
              {kanaList.map((kanaItem, index) => (
                <div
                  key={`${kanaItem.group}-${kanaItem.kana}-${index}`}
                  className="kana-item"
                >
                  <span className="kana-character">{kanaItem.kana}</span>
                  <span className="kana-romaji">{kanaItem.romaji}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kana;
