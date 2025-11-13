# NEP 2020 AI Dashboard

A comprehensive AI-powered dashboard for implementing India's National Education Policy 2020, featuring personalized learning for students and school-wide analytics for principals.

## 🌟 Features

### Student Dashboard
- ✅ Personalized Adaptive Learning (PAL)
- ✅ 360° Holistic Progress Card (HPC) - Academic, Cognitive, Social-Emotional, Physical, Arts, Project scores
- ✅ Subject-wise learning progress tracking
- ✅ AI chatbot for academic support
- ✅ Goal setting and achievement tracking
- ✅ Interactive learning modules
- ✅ Multilingual support
- ✅ Vocational course tracking

### Principal Dashboard
- ✅ Real-time school-wide analytics
- ✅ NEP 2020 compliance monitoring (20 metrics)
- ✅ Student performance tracking (60 students)
- ✅ Teacher performance insights (20 teachers)
- ✅ Attendance and dropout monitoring
- ✅ Predictive student intervention alerts
- ✅ Resource allocation tracking
- ✅ Comprehensive report generation

## 🚀 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Data:** CSV files with PapaParse
- **Deployment:** Vercel

## 📁 Project Structure

```
nep-ai-dashboard/
├── app/
│   ├── student/          # Student dashboard
│   ├── principal/        # Principal dashboard
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/           # Reusable components
├── lib/
│   ├── data-loader.ts   # CSV data loading utilities
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Helper functions
├── public/
│   └── data/            # CSV data files (8 files)
├── package.json
└── README.md
```

## 📊 Data Files

### 8 Comprehensive CSV Files:

1. **students.csv** (60 students, Classes 1-12)
   - Student demographics, parent contacts, class assignments

2. **teachers.csv** (20 qualified teachers)
   - Qualifications (PhD/MSc/MA + B.Ed), CPD hours, performance scores

3. **assessments.csv** (60+ records)
   - 360° Holistic Progress Card data
   - 6 dimensions: Academic, Cognitive, Social-Emotional, Physical, Arts, Project
   - Competency levels: Beginner → Expert

4. **attendance.csv** (80+ records)
   - Student and teacher attendance
   - Status tracking with remarks

5. **learning_progress.csv** (65+ records)
   - Chapter-wise progress
   - Time spent, current topics, completion percentage

6. **vocational_courses.csv** (35 records)
   - NEP 2020 mandatory vocational training (Classes 6-12)
   - 6 categories: Technology, Agriculture, Healthcare, Arts, Commerce, Engineering

7. **nep_compliance.csv** (20 metrics)
   - School-level NEP 2020 compliance tracking
   - FLN achievement, 5+3+3+4 structure, dropout rates

8. **alerts.csv** (20 intervention alerts)
   - Predictive AI alerts for at-risk students
   - Types: Academic, Attendance, Behavior, Health

## 🛠️ Local Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open browser:**
```
http://localhost:3000
```

## 🌐 Deploy to Vercel

### Method 1: Via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

### Method 2: Via Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js
6. Click "Deploy"

### Environment Setup
No environment variables required - all data is in CSV files.

## 📈 NEP 2020 Compliance Features

1. **360° Holistic Assessment** - Multi-dimensional student evaluation
2. **5+3+3+4 Structure** - Students distributed across all stages
3. **Vocational Training** - Mandatory for Classes 6-12
4. **CPD Tracking** - Teachers monitored for 50 hours/year
5. **Foundational Literacy & Numeracy (FLN)** - Progress tracking
6. **Competency-Based Learning** - Skill-based evaluation
7. **Student-Teacher Ratio** - Maintained at 28:1 (target <30:1)
8. **Multilingual Support** - Regional language integration
9. **Dropout Monitoring** - Predictive interventions
10. **AI-Powered Alerts** - Early warning system

## 🎯 Demo Credentials

### Student Dashboard
- Access: Click "Student Portal" on homepage
- Demo data: First student (Aarav Sharma, Class 1-A) auto-loaded

### Principal Dashboard
- Access: Click "Principal Portal" on homepage
- Full school data loaded automatically

## 📱 Responsive Design

- ✅ Desktop optimized
- ✅ Tablet friendly
- ✅ Mobile responsive

## 🔒 Data Privacy

- All data is **dummy/sample data** for demonstration
- No real student information included
- Ready for integration with actual school databases

## 📄 License

This project is a demonstration of NEP 2020 implementation capabilities.

## 🤝 Support

For questions or support, contact the development team.

---

**Built with ❤️ for India's Education System** 🇮🇳
