import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Aperture, 
  Film, 
  Zap, 
  Cpu, 
  RefreshCw, 
  Check, 
  Sliders,
  Layers
} from 'lucide-react';

const VeoPromptGen = () => {
  const [formData, setFormData] = useState({
    subject: '',
    action: '',
    environment: '',
    style: 'Cinematic Realistic',
    camera: 'Drone Shot',
    lighting: 'Golden Hour',
    aspectRatio: '16:9',
    duration: '5s',
    seed: '',
    consistencyMode: true
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('generator'); // generator | history

  // Efek mengetik otomatis pada header
  const [titleText, setTitleText] = useState('');
  const fullTitle = "VEO-3 PROMPT CORE";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTitleText(fullTitle.slice(0, i));
      i++;
      if (i > fullTitle.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generatePrompt = () => {
    setIsGenerating(true);
    setGeneratedPrompt('');

    // Simulasi proses AI "Thinking" dengan delay
    setTimeout(() => {
      const { 
        subject, action, environment, style, camera, 
        lighting, aspectRatio, duration, seed, consistencyMode 
      } = formData;

      // Struktur prompt yang dioptimalkan untuk Video AI
      let promptParts = [];

      // Bagian Utama
      promptParts.push(`(Masterpiece, 8k Resolution), ${style}`);
      promptParts.push(`SUBJECT: ${subject || 'Undefined Subject'}`);
      promptParts.push(`ACTION: ${action || 'Idle motion'}`);
      promptParts.push(`ENVIRONMENT: ${environment || 'Neutral background'}`);
      
      // Bagian Teknis
      promptParts.push(`CAMERA: ${camera}, smooth motion`);
      promptParts.push(`LIGHTING: ${lighting}, volumetric lighting`);
      
      // Parameter Veo
      let params = `--ar ${aspectRatio} --duration ${duration}`;
      if (consistencyMode) {
        params += ` --consistency-lock --detail-preservation high`;
      }
      if (seed) {
        params += ` --seed ${seed}`;
      } else {
        // Generate random seed jika kosong untuk keperluan demo
        const randomSeed = Math.floor(Math.random() * 99999999);
        params += ` --seed ${randomSeed}`;
      }

      const finalPrompt = `${promptParts.join(', ')} ${params}`;
      
      setGeneratedPrompt(finalPrompt);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const randomizeSeed = () => {
    setFormData(prev => ({
      ...prev,
      seed: Math.floor(Math.random() * 99999999).toString()
    }));
  };

  return (
    <div className="min-h-screen bg-[#050510] text-slate-200 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-blue-600/10 rounded-full blur-[80px]"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 255, 255, 0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header */}
        <header className="mb-10 text-center relative">
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">System Online v3.0</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            {titleText}<span className="animate-blink text-cyan-400">_</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-lg mx-auto">
            Generate high-fidelity, consistent video prompts for the next generation of AI video models.
          </p>
        </header>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full"></div>

              <h2 className="text-xl font-bold text-white flex items-center mb-6 border-b border-slate-800 pb-2">
                <Sliders className="w-5 h-5 mr-2 text-cyan-400" />
                Input Parameters
              </h2>

              <div className="space-y-5">
                {/* Subject & Action */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 mb-1 block font-mono">Core Subject (Subjek Utama)</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Contoh: Seorang samurai cyberpunk di kota masa depan..." 
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 mb-1 block font-mono">Action / Movement (Aksi / Gerakan)</label>
                    <textarea 
                      name="action"
                      value={formData.action}
                      onChange={handleInputChange}
                      placeholder="Contoh: Sedang menarik pedang katana yang bercahaya, efek hujan gerak lambat..." 
                      rows="2"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600 resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 mb-1 block font-mono">Environment / Background (Lingkungan / Latar Belakang)</label>
                    <input 
                      type="text" 
                      name="environment"
                      value={formData.environment}
                      onChange={handleInputChange}
                      placeholder="Contoh: Kota futuristik dengan gedung pencakar langit neon, malam hari..." 
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Dropdowns Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 mb-1 block font-mono">Art Style (Gaya Seni)</label>
                    <div className="relative">
                      <select 
                        name="style"
                        value={formData.style}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:border-cyan-500 text-sm"
                      >
                        <option>Cinematic Realistic</option>
                        <option>3D Animation Style</option>
                        <option>Anime / Ghibli Style</option>
                        <option>Cyberpunk Noir</option>
                        <option>Vintage 80s Film</option>
                        <option>Abstract Liquid</option>
                      </select>
                      <Layers className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 mb-1 block font-mono">Camera Angle (Sudut Kamera)</label>
                    <div className="relative">
                      <select 
                        name="camera"
                        value={formData.camera}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:border-cyan-500 text-sm"
                      >
                        <option>Drone Shot</option>
                        <option>Eye Level</option>
                        <option>Low Angle</option>
                        <option>Extreme Close Up</option>
                        <option>POV Shot</option>
                        <option>Tracking Shot</option>
                      </select>
                      <Film className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 mb-1 block font-mono">Lighting (Pencahayaan)</label>
                    <div className="relative">
                      <select 
                        name="lighting"
                        value={formData.lighting}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:border-cyan-500 text-sm"
                      >
                        <option>Golden Hour</option>
                        <option>Neon Cyberpunk</option>
                        <option>Studio Softbox</option>
                        <option>Dark & Moody</option>
                        <option>Natural Daylight</option>
                      </select>
                      <Zap className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-slate-400 mb-1 block font-mono">Aspect Ratio (Rasio)</label>
                    <div className="relative">
                      <select 
                        name="aspectRatio"
                        value={formData.aspectRatio}
                        onChange={handleInputChange}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:border-cyan-500 text-sm"
                      >
                        <option value="16:9">16:9 (Cinematic)</option>
                        <option value="9:16">9:16 (Vertical/Shorts)</option>
                        <option value="1:1">1:1 (Square)</option>
                        <option value="2.35:1">2.35:1 (Anamorphic)</option>
                      </select>
                      <Aperture className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Consistency Control */}
                <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs uppercase tracking-wider text-cyan-400 font-bold font-mono flex items-center">
                      <Cpu className="w-3 h-3 mr-2" /> Consistency Engine
                    </label>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="consistencyMode"
                        name="consistencyMode"
                        checked={formData.consistencyMode}
                        onChange={handleInputChange}
                        className="mr-2 accent-cyan-500"
                      />
                      <label htmlFor="consistencyMode" className="text-xs text-slate-300">Kunci Gaya (Lock Style)</label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      name="seed"
                      value={formData.seed}
                      onChange={handleInputChange}
                      placeholder="ID Seed (Opsional untuk konsistensi)" 
                      className="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-cyan-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                    />
                    <button 
                      onClick={randomizeSeed}
                      className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
                      title="Generate Random Seed"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Panel: Output */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Generate Button Card */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
               <button
                onClick={generatePrompt}
                disabled={isGenerating}
                className={`w-full relative group overflow-hidden rounded-xl p-4 font-bold text-lg tracking-wider transition-all duration-300 ${
                  isGenerating 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:scale-[1.02]'
                }`}
              >
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full duration-700 transform -skew-x-12 -translate-x-[120%]"></div>
                
                {isGenerating ? (
                   <span className="flex items-center justify-center gap-2">
                     <span className="w-4 h-4 border-2 border-slate-500 border-t-cyan-400 rounded-full animate-spin"></span>
                     PROCESSING...
                   </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 fill-white" />
                    GENERATE VEO PROMPT
                  </span>
                )}
              </button>
            </div>

            {/* Output Display */}
            <div className="flex-1 bg-black/40 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 relative flex flex-col">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                   OUTPUT TERMINAL
                 </h3>
                 {generatedPrompt && (
                   <button 
                    onClick={copyToClipboard}
                    className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all ${
                      isCopied 
                      ? 'bg-green-500/20 border-green-500 text-green-400' 
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-400'
                    }`}
                   >
                     {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                     {isCopied ? 'COPIED' : 'COPY'}
                   </button>
                 )}
              </div>

              <div className="flex-1 relative bg-slate-900/80 rounded-xl border border-slate-700/50 p-4 font-mono text-sm leading-relaxed overflow-hidden">
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20"></div>

                {isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center text-cyan-500 space-y-4">
                    <div className="relative w-16 h-16">
                       <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                       <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-spin"></div>
                       <div className="absolute inset-4 bg-cyan-500/20 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-xs tracking-widest animate-pulse">COMPILING DATA...</div>
                    <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-500 animate-progress"></div>
                    </div>
                  </div>
                ) : generatedPrompt ? (
                  <div className="h-full overflow-y-auto custom-scrollbar text-slate-300 animate-fadeIn">
                    <p className="break-words whitespace-pre-wrap">{generatedPrompt}</p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600">
                    <Cpu className="w-12 h-12 mb-2 opacity-50" />
                    <p className="text-xs uppercase tracking-wider">No Data Generated</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-600 text-xs font-mono">
          <p>DESIGNED FOR NEXT-GEN GENERATIVE VIDEO • SYSTEM STATUS: NORMAL</p>
        </footer>

      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0e7490;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #06b6d4;
        }
      `}</style>
    </div>
  );
};

export default VeoPromptGen;