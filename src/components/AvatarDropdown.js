import { useState, useRef, useEffect } from "react";
import avatar from "../assets/avatar.jpg";

const AvatarDropdown = (props) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const dropdownRef = useRef(null);
    const users = props.users;
    
    function handleSelect(user) {
        setSelected(user);
        setOpen(false);
        props.onSelect(user.id);
    }
    
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="avatar-dropdown" ref={dropdownRef}>
            <div className="selected" onClick={() => setOpen(!open)}>
                {selected ? (
                    <div>
                        {selected.avatarURL ? <img src={selected.avatarURL} alt="avatar" /> : <img src={avatar} alt="avatar" />}
                        <span>{selected.name}</span>
                    </div>
                ) : (
                    <span>Select User</span>
                )}
                <span className="arrow">{open ? "▲" : "▼"}</span>
            </div>

            {open && (
                <div className="dropdown-list">
                    {Object.values(users).map((user) => (
                        <div
                            key={user.id}
                            className="dropdown-item"
                            onClick={() => handleSelect(user)}
                        >
                            {user.avatarURL ? <img src={user.avatarURL} alt="avatar" /> : <img src={avatar} alt="avatar" />}
                            <span>{user.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default (AvatarDropdown)

//Reference: CoPilot suggestions For creating dropdown without using select