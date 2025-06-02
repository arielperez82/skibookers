import { RecommendationService } from "@personalization/application/ports/recommendation-service";
import { ResortRecommendation, UserPreferences } from "@personalization/domain";
import { BudgetRange } from '@personalization/domain/budget-range';

const resorts = [
  {
    id: 'alps-1',
    name: 'Alpine Dream Resort',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    matchPercent: 92,
    description: 'A top-rated resort in the heart of the Alps with world-class amenities.',
    match: 92,
    conditions: { label: 'Excellent', icon: '😃' },
    skill: 'Advanced',
    runs: 45,
    region: 'Alps',
    budget: '€2000–€4000',
    vibe: 'Luxury/Relaxation',
    groupType: 'Couple',
  },
  {
    id: 'rockies-2',
    name: 'Rocky Mountain Escape',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    matchPercent: 87,
    description: 'Perfect for adventure seekers, with breathtaking views and powder snow.',
    match: 87,
    conditions: { label: 'Good', icon: '🙂' },
    skill: 'Intermediate',
    runs: 38,
    region: 'Rockies',
    budget: '€1000–€2000',
    vibe: 'Adventure/Sporty',
    groupType: 'Friends',
  },
  {
    id: 'dolomites-3',
    name: 'Dolomites Snow Haven',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    matchPercent: 85,
    description: 'Charming Italian resort with gourmet cuisine and scenic slopes.',
    match: 85,
    conditions: { label: 'Good', icon: '🙂' },
    skill: 'Intermediate',
    runs: 35,
    region: 'Alps',
    budget: '€2000–€4000',
    vibe: 'Luxury/Relaxation',
    groupType: 'Couple',
  },
  {
    id: 'pyrenees-4',
    name: 'Pyrenees Peaks Resort',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    matchPercent: 83,
    description: 'Family-friendly, sunny slopes, and lively après-ski.',
    match: 83,
    conditions: { label: 'Fair', icon: '😐' },
    skill: 'Beginner',
    runs: 28,
    region: 'Alps',
    budget: '< €1000',
    vibe: 'Family-friendly',
    groupType: 'Family',
  },
  {
    id: 'andes-5',
    name: 'Andes Adventure Lodge',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
    matchPercent: 80,
    description: 'South American gem with long runs and dramatic vistas.',
    match: 80,
    conditions: { label: 'Fair', icon: '😐' },
    skill: 'Beginner',
    runs: 22,
    region: 'Other',
    budget: '€1000–€2000',
    vibe: 'Adventure/Sporty',
    groupType: 'Friends',
  },
  {
    id: 'japan-6',
    name: 'Niseko Powder Paradise',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    matchPercent: 90,
    description: 'World-famous for deep powder and relaxing onsens.',
    match: 90,
    conditions: { label: 'Excellent', icon: '😃' },
    skill: 'Advanced',
    runs: 44,
    region: 'Japan',
    budget: '€2000–€4000',
    vibe: 'Luxury/Relaxation',
    groupType: 'Couple',
  },
  {
    id: 'canada-7',
    name: 'Whistler Winter Escape',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=600&q=80',
    matchPercent: 88,
    description: 'Vast terrain, vibrant village, and reliable snowfall.',
    match: 88,
    conditions: { label: 'Good', icon: '🙂' },
    skill: 'Intermediate',
    runs: 39,
    region: 'Rockies',
    budget: '€2000–€4000',
    vibe: 'Party/Après',
    groupType: 'Friends',
  },
  {
    id: 'norway-8',
    name: 'Fjord Frost Resort',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
    matchPercent: 82,
    description: 'Ski with breathtaking fjord views and northern lights.',
    match: 82,
    conditions: { label: 'Fair', icon: '😐' },
    skill: 'Beginner',
    runs: 25,
    region: 'Scandinavia',
    budget: '€1000–€2000',
    vibe: 'Adventure/Sporty',
    groupType: 'Solo',
  },
  {
    id: 'swiss-9',
    name: 'Matterhorn Majesty',
    image: 'https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=600&q=80',
    matchPercent: 91,
    description: 'Iconic Swiss resort with luxury amenities and stunning peaks.',
    match: 91,
    conditions: { label: 'Excellent', icon: '😃' },
    skill: 'Advanced',
    runs: 46,
    region: 'Alps',
    budget: '€4000+',
    vibe: 'Luxury/Relaxation',
    groupType: 'Couple',
  },
  {
    id: 'austria-10',
    name: 'Tyrolean Alpine Lodge',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    matchPercent: 84,
    description: 'Traditional charm, lively après-ski, and scenic runs.',
    match: 84,
    conditions: { label: 'Fair', icon: '😐' },
    skill: 'Beginner',
    runs: 27,
    region: 'Alps',
    budget: '€1000–€2000',
    vibe: 'Party/Après',
    groupType: 'Friends',
  },
  {
    id: 'utah-11',
    name: 'Park City Powder Club',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80',
    matchPercent: 86,
    description: 'Premier US resort with diverse terrain and vibrant town.',
    match: 86,
    conditions: { label: 'Good', icon: '🙂' },
    skill: 'Intermediate',
    runs: 36,
    region: 'Rockies',
    budget: '€2000–€4000',
    vibe: 'Party/Après',
    groupType: 'Friends',
  },
  {
    id: 'france-12',
    name: 'Chamonix Summit Retreat',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
    matchPercent: 89,
    description: 'Legendary off-piste and dramatic Mont Blanc views.',
    match: 89,
    conditions: { label: 'Good', icon: '🙂' },
    skill: 'Intermediate',
    runs: 41,
    region: 'Alps',
    budget: '€2000–€4000',
    vibe: 'Adventure/Sporty',
    groupType: 'Solo',
  },
  {
    id: 'newzealand-13',
    name: 'Queenstown Snowfields',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    matchPercent: 78,
    description: 'Southern Hemisphere adventure with lakeside scenery.',
    match: 78,
    conditions: { label: 'Poor', icon: '😕' },
    skill: 'Beginner',
    runs: 15,
    region: 'Other',
    budget: '< €1000',
    vibe: 'Adventure/Sporty',
    groupType: 'Friends',
  },
  {
    id: 'colorado-14',
    name: 'Aspen Elite Resort',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    matchPercent: 90,
    description: 'Celebrity hotspot with top-tier slopes and dining.',
    match: 90,
    conditions: { label: 'Excellent', icon: '😃' },
    skill: 'Advanced',
    runs: 43,
    region: 'Rockies',
    budget: '€4000+',
    vibe: 'Luxury/Relaxation',
    groupType: 'Couple',
  },
  {
    id: 'bulgaria-15',
    name: 'Bansko Budget Bliss',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    matchPercent: 75,
    description: 'Affordable, modern lifts, and lively nightlife.',
    match: 75,
    conditions: { label: 'Poor', icon: '😕' },
    skill: 'Beginner',
    runs: 12,
    region: 'Other',
    budget: '< €1000',
    vibe: 'Party/Après',
    groupType: 'Friends',
  },
  {
    id: 'finland-16',
    name: 'Lapland Aurora Resort',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    matchPercent: 79,
    description: 'Ski under the northern lights in magical Lapland.',
    match: 79,
    conditions: { label: 'Poor', icon: '😕' },
    skill: 'Beginner',
    runs: 14,
    region: 'Scandinavia',
    budget: '€1000–€2000',
    vibe: 'Adventure/Sporty',
    groupType: 'Family',
  },
  {
    id: 'slovenia-17',
    name: 'Julian Alps Hideaway',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    matchPercent: 77,
    description: 'Hidden gem with friendly locals and beautiful scenery.',
    match: 77,
    conditions: { label: 'Poor', icon: '😕' },
    skill: 'Beginner',
    runs: 16,
    region: 'Alps',
    budget: '< €1000',
    vibe: 'Family-friendly',
    groupType: 'Family',
  },
  {
    id: 'chile-18',
    name: 'Portillo Andes Resort',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
    matchPercent: 81,
    description: 'Historic South American resort with legendary runs.',
    match: 81,
    conditions: { label: 'Fair', icon: '😐' },
    skill: 'Beginner',
    runs: 24,
    region: 'Other',
    budget: '€1000–€2000',
    vibe: 'Adventure/Sporty',
    groupType: 'Friends',
  },
  {
    id: 'germany-19',
    name: 'Bavarian Snowpark',
    image: 'https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=600&q=80',
    matchPercent: 76,
    description: 'Classic alpine experience with hearty cuisine.',
    match: 76,
    conditions: { label: 'Poor', icon: '😕' },
    skill: 'Beginner',
    runs: 13,
    region: 'Alps',
    budget: '< €1000',
    vibe: 'Family-friendly',
    groupType: 'Family',
  },
  {
    id: 'czech-20',
    name: 'Krkonoše Winter Escape',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
    matchPercent: 74,
    description: 'Charming slopes and cozy mountain villages.',
    match: 74,
    conditions: { label: 'Bad', icon: '☹️' },
    skill: 'Beginner',
    runs: 11,
    region: 'Other',
    budget: '< €1000',
    vibe: 'Family-friendly',
    groupType: 'Family',
  },
];

export class MockRecommendationService implements RecommendationService {
  async generateRecommendations(preferences: UserPreferences): Promise<ResortRecommendation[]> {
    // Filter resorts based on preferences
    return resorts
      .filter(r => {

        // Region match
        //if (preferences.terrainPreference && r.region !== preferences.terrainPreference) return false;
        // Vibe match
        if (preferences.travelStyle && r.vibe && r.vibe.toLowerCase().indexOf(preferences.travelStyle.toLowerCase()) === -1) return false;
        // Budget match
        let resortBudget: BudgetRange | null = null;
        try {
          resortBudget = BudgetRange.fromStringRange(r.budget.replace(/€/g, '').replace(/\s/g, ''));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          return false; // skip resorts with invalid budget
        }

        let userBudget: BudgetRange;
        if (preferences.budgetRange instanceof BudgetRange) {
          userBudget = preferences.budgetRange;
        } else {
          try {
            userBudget = BudgetRange.fromStringRange(
              typeof preferences.budgetRange === 'string'
                ? preferences.budgetRange
                : `${preferences.budgetRange.min}-${preferences.budgetRange.max}`
            );
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            return false;
          }
        }
        
        if (resortBudget && userBudget) {
          //if (!userBudget.containsRange(resortBudget)) return false;
        }
        // Skill/experience match (optional, loose)
        if (preferences.experienceLevel && r.skill && r.skill.toLowerCase() !== preferences.experienceLevel.toLowerCase()) return false;
        return true;
      })
      .map(r => {
        return {
          ...r,
          reasons: [
            `Matches your preferences for region, budget, and style.`
          ]
        };
      });
  }
  async saveRecommendation(userId: string, recommendation: ResortRecommendation): Promise<void> {
    console.log('saving recommendation', userId, recommendation);
  }
}