import React from 'react';
import './About.css';

export default function About() {
    return (
        <div className="about-container">
            <div className="about-card">
                <h1 className="about-title">About iNoteBook Pro</h1>

                <p className="about-description">
                    <strong>iNoteBook Pro</strong> is your modern digital notebook designed to help you securely store, manage, and organize your important notes. Whether you are a student managing study notes, a developer keeping track of ideas, or a professional managing daily tasks, <strong>iNoteBook Pro</strong> provides you with a fast, responsive, and clean experience to make your productivity seamless.
                </p>

                <h3 className="about-section-title"> Why iNoteBook Pro?</h3>
                <p className="about-description">
                    In the digital world, keeping notes secure and accessible is crucial. With iNoteBook Pro, your notes are always safe, neatly organized, and easy to manage. It's designed to simplify your note management without the need for messy papers or scattered files.
                </p>

                <h3 className="about-section-title"> Key Features</h3>
                <ul className="about-list">
                    <li> Add, Edit, and Delete your personal notes.</li>
                    <li> Organize notes using tags for easy filtering.</li>
                    <li> Secure login to keep your data protected.</li>
                    <li> Responsive UI with Light & Dark Mode support.</li>
                    <li> Fast performance using React.js and modern web technologies.</li>
                </ul>

                <h3 className="about-section-title"> Technologies Used</h3>
                <ul className="about-list">
                    <li>React.js (Hooks, Context API)</li>
                    <li>Bootstrap 5 & Custom CSS</li>
                    <li>JavaScript (ES6+), HTML5, CSS3</li>
                    <li>REST API Integration</li>
                    <li>Responsive Web Design (Mobile & Desktop)</li>
                </ul>

                <h3 className="about-section-title"> Project Purpose</h3>
                <p className="about-description">
                    The purpose behind building iNoteBook Pro is to practice real-world React.js development, strengthen problem-solving skills, and build something that could genuinely help people keep their daily notes secure, organized, and easily accessible anywhere.
                </p>

                <div className="about-footer"> Built with by Omkar Haral — React.js Frontend Developer</div>
            </div>
        </div>
    );
}
