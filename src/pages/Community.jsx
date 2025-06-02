import React from 'react';
import Navbar from '../components/Navbar';
import '../static/style/CommunityAndNetworking.css';

const Community = () => {
  const communities = [
    { title: 'Hashnode Community', description: 'A place for devs to share articles and connect with like-minded folks.', url: 'https://hashnode.com/' },
    { title: 'Dev.to', description: 'An open community for developers to share ideas and grow.', url: 'https://dev.to/' },
    { title: 'Stack Overflow', description: 'Ask questions, share answers, and grow your programming knowledge.', url: 'https://stackoverflow.com/' },
    { title: 'r/learnprogramming', description: 'One of Reddit’s largest programming communities.', url: 'https://www.reddit.com/r/learnprogramming/' },
    { title: 'FreeCodeCamp Forum', description: 'Discuss code, projects, and get support.', url: 'https://forum.freecodecamp.org/' },
    { title: 'GitHub Discussions', description: 'Join open-source conversations.', url: 'https://github.com/discussions' },
  ];

  const events = [
    { title: 'Google DevFest', description: 'Global developer conference hosted by Google Developer Groups.', url: 'https://developers.google.com/community/devfest' },
    { title: 'MLH Hackathons', description: 'Major League Hacking hosts global student hackathons.', url: 'https://mlh.io/seasons/2024/events' },
    { title: 'Women Who Code Events', description: 'Tech talks, meetups and mentorship for women in tech.', url: 'https://www.womenwhocode.com/events' },
    { title: 'Codechef Contests', description: 'Compete and sharpen your coding skills.', url: 'https://www.codechef.com/contests' },
  ];

  const platforms = [
    { title: 'LinkedIn Tech Groups', description: 'Join groups relevant to your domain.', url: 'https://www.linkedin.com/groups/' },
    { title: 'Indie Hackers', description: 'A space for entrepreneurs and devs to build and grow.', url: 'https://www.indiehackers.com/' },
    { title: 'Tech Twitter (X)', description: 'Follow #100DaysOfCode, #DevCommunity, and tech influencers.', url: 'https://twitter.com/' },
    { title: 'Slack: Frontend Developers', description: 'Join global frontend devs in Slack groups.', url: 'https://frontenddevelopers.org/' },
  ];

  const newsletters = [
    { title: 'JavaScript Weekly', description: 'Weekly roundup of the best JS content.', url: 'https://javascriptweekly.com/' },
    { title: 'Frontend Focus', description: 'News and updates in frontend development.', url: 'https://frontendfoc.us/' },
    { title: 'AI Weekly', description: 'Weekly insights in artificial intelligence.', url: 'https://www.getrevue.co/profile/ai' },
    { title: 'TLDR Newsletter', description: 'Tech news boiled down to the essentials.', url: 'https://tldr.tech/' },
  ];

  const renderSection = (title, items) => (
    <>
      <h2>{title}</h2>
      <div className="community-grid">
        {items.map((item, index) => (
          <div className="community-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.url} target="_blank" rel="noreferrer">Explore</a>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
    <Navbar />
    <div className="community-page">
      
      <div className="community-container">
        <h1>🌐 Community & Networking</h1>
        {renderSection('👥 Developer Communities', communities)}
        {renderSection('📅 Events & Hackathons', events)}
        {renderSection('🔗 Networking Platforms', platforms)}
        {renderSection('📬 Newsletters & Mailing Lists', newsletters)}
      </div>
    </div>
    </>
  );
};

export default Community;
