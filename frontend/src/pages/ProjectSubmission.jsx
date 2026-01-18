
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useData } from '../context/DataContext';

const ProjectSubmission = () => {
    const navigate = useNavigate();
    const { addProject } = useData();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // File Refs
    const pddInputRef = useRef(null);
    const photoInputRef = useRef(null);

    // Form and File State
    const [files, setFiles] = useState({
        pdd: null,
        photos: []
    });

    const [formData, setFormData] = useState({
        name: '',
        type: 'Reforestation',
        developer: 'GreenEarth NGO', // Hardcoded for demo
        description: '',
        location: '',
        latitude: '',
        longitude: '',
        area: '',
        methodology: 'VM0033',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, type) => {
        if (e.target.files && e.target.files[0]) {
            if (type === 'pdd') {
                setFiles(prev => ({ ...prev, pdd: e.target.files[0] }));
            } else if (type === 'photo') {
                setFiles(prev => ({ ...prev, photos: [...prev.photos, e.target.files[0]] }));
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate API/Blockchain delay
        // In real app, we would upload files here and get URLs
        setTimeout(async () => {
            try {
                await addProject(formData); // files would be passed here too
                setLoading(false);
                navigate('/ngo');
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <DashboardLayout role="NGO">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Register New Project</h1>
                    <p className="text-slate-500">Submit your blue carbon project for verification.</p>
                </div>

                {/* Steps Indicator */}
                <div className="flex items-center justify-between mb-8 px-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                {s}
                            </div>
                        </div>
                    ))}
                    {/* Simple lines handled by CSS or just spacing for now */}
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">

                    {/* STEP 1: Basic Info */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Project Basics</h2>

                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g., Coastal Mangrove Revival"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Project Type</label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                        >
                                            <option>Reforestation</option>
                                            <option>Conservation</option>
                                            <option>Restoration</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Methodology</label>
                                        <input
                                            name="methodology"
                                            value={formData.methodology}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Describe the project goals and impact..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Location */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Location & Area</h2>

                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Location (District, State)</label>
                                    <input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g., Sundarbans, West Bengal"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
                                        <input
                                            name="latitude"
                                            value={formData.latitude}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="21.9497° N"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
                                        <input
                                            name="longitude"
                                            value={formData.longitude}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="89.1833° E"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Total Area (Hectares)</label>
                                    <input
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        type="number"
                                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none" placeholder="500"
                                    />
                                </div>

                                {/* Interactive Map Placeholder */}
                                <div className="h-64 bg-slate-100 rounded-lg border border-slate-300 overflow-hidden relative group cursor-crosshair">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 group-hover:bg-slate-200/50 transition-colors">
                                        <div className="text-center">
                                            <span className="text-2xl">🗺️</span>
                                            <p className="text-sm font-medium">Click to Pin Location</p>
                                        </div>
                                    </div>
                                    {/* Mock Map Grid */}
                                    <div className="w-full h-full opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Evidence */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Evidence & Documentation</h2>

                            {/* Documents */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Documentation (PDD)</label>
                                <input
                                    type="file"
                                    ref={pddInputRef}
                                    onChange={(e) => handleFileChange(e, 'pdd')}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                />
                                <div
                                    onClick={() => pddInputRef.current.click()}
                                    className="p-6 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-white hover:border-teal-400 transition-colors cursor-pointer"
                                >
                                    <span className="text-3xl mb-2">📄</span>
                                    <p className="text-sm text-slate-600 font-medium">
                                        {files.pdd ? files.pdd.name : "Drag and drop PDD PDF"}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">or click to browse</p>
                                </div>
                            </div>

                            {/* Images/Photos */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Site Photos / Drone Imagery</label>
                                <input
                                    type="file"
                                    ref={photoInputRef}
                                    onChange={(e) => handleFileChange(e, 'photo')}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Upload Button */}
                                    <div
                                        onClick={() => photoInputRef.current.click()}
                                        className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-teal-400 transition-colors cursor-pointer text-slate-500 hover:text-teal-600"
                                    >
                                        <span className="text-2xl">+</span>
                                        <span className="text-xs font-medium mt-1">Upload Photo</span>
                                    </div>
                                    {/* Mock Uploaded Images */}
                                    <div className="aspect-square bg-slate-200 rounded-lg relative overflow-hidden group">
                                        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 font-medium bg-slate-100">mangrove_01.jpg</div>
                                    </div>
                                    <div className="aspect-square bg-slate-200 rounded-lg relative overflow-hidden group">
                                        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 font-medium bg-slate-100">site_survey.png</div>
                                    </div>
                                    {/* Real uploaded preview could go here */}
                                    {files.photos.map((f, i) => (
                                        <div key={i} className="aspect-square bg-teal-50 rounded-lg relative overflow-hidden group border border-teal-200">
                                            <div className="absolute inset-0 flex items-center justify-center text-xs text-teal-700 font-medium p-2 text-center break-all">{f.name}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Upload at least 3 geotagged photos of the restoration site.</p>
                            </div>

                            <div className="bg-amber-50 p-3 rounded border border-amber-100 flex gap-2">
                                <span className="text-amber-600">⚠️</span>
                                <p className="text-sm text-amber-800">
                                    Geotagged drone footage will be required for the first MRV verification cycle. Ensure baseline data is accurate.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-4 border-t border-slate-100">
                    {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Back</button>
                    ) : (
                        <div></div>
                    )}

                    {step < 3 ? (
                        <button onClick={() => setStep(step + 1)} className="px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800">Next Step</button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all flex items-center gap-2"
                        >
                            {loading ? 'Submitting...' : 'Submit Project'}
                        </button>
                    )}
                </div>

            </div>
        </DashboardLayout >
    );
};

export default ProjectSubmission;
