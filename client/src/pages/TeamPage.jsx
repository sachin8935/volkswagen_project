import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Linkedin, Github, Mail, Code, ChevronLeft, 
  Sparkles, Car, Users, Coffee, Heart
} from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Sachin',
      role: 'Software Engineer',
      image: '/team/sachin.png',
      specialization: 'Full Stack Development',
      linkedin: '#',
      github: '#',
      email: 'sachin@volkswagen.com'
    },
    {
      name: 'Andrea',
      role: 'Software Engineer',
      image: '/team/andrea.jpg',
      specialization: 'Frontend Development',
      linkedin: '#',
      github: '#',
      email: 'andrea@volkswagen.com'
    },
    {
      name: 'Isra',
      role: 'Software Engineer',
      image: '/team/isra.jpg',
      specialization: 'Backend Development',
      linkedin: '#',
      github: '#',
      email: 'isra@volkswagen.com'
    },
    {
      name: 'Kanishk',
      role: 'Software Engineer',
      image: '/team/kanishk.jpg',
      specialization: 'DevOps & Cloud',
      linkedin: '#',
      github: '#',
      email: 'kanishk@volkswagen.com'
    },
    {
      name: 'Rekha',
      role: 'Software Engineer',
      image: '/team/rekha.jpg',
      specialization: 'UI/UX Development',
      linkedin: '#',
      github: '#',
      email: 'rekha@volkswagen.com'
    }
  ];

  const stats = [
    { icon: Users, value: '5', label: 'Team Members' },
    { icon: Code, value: '2K+', label: 'Lines of Code' },
    { icon: Coffee, value: '∞', label: 'Cups of Coffee' },
    { icon: Heart, value: '100%', label: 'Passion' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Meet the Innovators
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Team</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            The passionate engineers behind Volkswagen's digital transformation. 
            We're building the future of automotive e-commerce, one line of code at a time.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Software Engineers at Volkswagen
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A diverse team of talented individuals working together to create exceptional digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div 
                key={idx}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 rounded-3xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                  
                  {/* Overlay Icons */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <a 
                      href={member.linkedin}
                      className="p-3 rounded-full bg-white/10 hover:bg-blue-500 text-white backdrop-blur-sm transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.github}
                      className="p-3 rounded-full bg-white/10 hover:bg-gray-700 text-white backdrop-blur-sm transition-all"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="p-3 rounded-full bg-white/10 hover:bg-red-500 text-white backdrop-blur-sm transition-all"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Code className="w-4 h-4" />
                    {member.specialization}
                  </div>
                </div>

                {/* VW Badge */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            We're always looking for talented engineers who are passionate about building 
            innovative solutions in the automotive industry.
          </p>
          <a 
            href="https://www.volkswagen-group.com/en/careers-15937"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-all hover:shadow-2xl hover:shadow-blue-500/30"
          >
            View Open Positions
            <ChevronLeft className="w-5 h-5 rotate-180" />
          </a>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Volkswagen Digital Team. Built with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
