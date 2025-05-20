import React, { useState } from 'react';

const emojis = ['😀', '😂', '😍', '😎', '👍', '🎉', '🔥', '💡', '🚀', '🌟'];

interface AddEmojiProps {
    onAdd: (emoji: string) => void;
}

const AddEmoji: React.FC<AddEmojiProps> = ({ onAdd }) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (emoji: string) => {
        setSelected(emoji);
        onAdd(emoji);
    };

    return (
        <div>
            <h3>Add Emoji</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {emojis.map((emoji) => (
                    <button
                        key={emoji}
                        style={{
                            fontSize: 24,
                            padding: 8,
                            border: selected === emoji ? '2px solid #0078d4' : '1px solid #ccc',
                            borderRadius: 6,
                            background: 'white',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleSelect(emoji)}
                        aria-label={`Add ${emoji}`}
                        type="button"
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AddEmoji;