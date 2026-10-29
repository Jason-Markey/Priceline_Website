/**
 * Google reviews shown on /reviews/ and in the homepage "What our customers say" section (Jason, 29 Oct 2026).
 *
 * Rules for adding a review. They come from the law, not style, so keep to them:
 * - Only genuine Google reviews of Priceline Pharmacy Pacific Fair, copied word for word. Don't shorten, tidy or
 *   correct them: Ahpra warns that edited reviews easily become misleading, and the ACCC says the same about cutting
 *   out the negative parts. Choose reviews that work as written rather than trimming them.
 * - Only reviews about non-clinical things: the team's friendliness and helpfulness, service, speed, range, prices,
 *   the store, parking and opening hours. Leave out any review that mentions a symptom, condition, diagnosis,
 *   treatment, prescription, medicine, vaccination or result, or praises a pharmacist's skill, knowledge or advice:
 *   section 133 of the National Law bans using reviews about clinical aspects of a regulated health service.
 *   Nothing about Help Medical either; it's a separate business.
 * - First name and last initial only (Jason, 29 Oct 2026). No dates on the cards: Google only shows "x months ago".
 * - Update googleRating whenever you check the Google listing. It sits next to the reviews, so it must be current.
 * - No review or rating schema: Google ignores self-serving reviews, and marking up reviews copied from Google
 *   breaks its structured data guidelines.
 */

export type Review = {
  /** First name and last initial, e.g. "Sam T." */
  name: string;
  /** The review exactly as written on Google */
  text: string;
  /** Google star rating */
  stars: 5;
  /** Shows "Local Guide" under the name, as Google does */
  localGuide?: boolean;
  /** The big featured card at the top of /reviews/ (one review only) */
  lead?: boolean;
  /** Where it came from and when we copied it, for our records */
  source: string;
};

/** The Google listing's overall rating and review count (Jason's screenshot of the listing, 29 Oct 2026) */
export const googleRating = { rating: 4.6, count: 164, checked: '2026-10-29' };

/** Homepage shows the first three in this order; /reviews/ shows the lead review first, then the rest. */
export const reviews: Review[] = [
  { name: 'Nazanin R.', localGuide: true, stars: 5, source: 'Google, "a year ago"; screenshot 29 Oct 2026',
    text: 'Clean, well-organised, and the staff are helpful and kind.' },
  { name: 'Atlantis D.', stars: 5, source: 'Google Business Profile email, 1 May 2024',
    text: 'Love the team here, very helpful and professional. Thank you ☺️' },
  { name: 'Cindy M.', stars: 5, source: 'Google, "10 months ago"; screenshot 29 Oct 2026',
    text: 'Very impressed with the service I received this morning. A lady by the name of Ellie (I think that’s her name) went above and beyond to help me. I asked if there was a particular product I saw online and she checked online. She saw stock but said it was in the store room. I told her not to worry but she insisted that it was okay it wouldn’t take long. I went outside for breakfast and she came out to tell me she found them, and she’d leave them behind the counter for me. Lovely person considering it was such a busy morning.' },
  { name: 'Chelsea B.', stars: 5, source: 'Google, "a year ago"; screenshot 29 Oct 2026',
    text: 'I had an amazing experience with one of the pharmacy assistants at Priceline Pacific Fair. Caitlin went above and beyond to help me resolve an issue I was having. Not only was she incredibly understanding and patient, but she also took the time to make sure I got exactly what I needed. Her dedication to helping me was evident, and I truly appreciated her kindness and professionalism. I left feeling taken care of, and I couldn’t have asked for better service. Highly recommend this pharmacy!' },
  // Asha is on the beauty team (Jason, 29 Oct 2026), so "very knowledgeable" isn't praise for a pharmacist's clinical skill
  { name: 'Jessica C.', localGuide: true, stars: 5, source: 'Google, "6 months ago"; screenshot 29 Oct 2026',
    text: 'Asha helped me today. Very knowledgeable about are products and how to actually use them. Amazing customer service.\nI never do reviews. she\'s so good.' },
  { name: 'Shayla W.', lead: true, stars: 5, source: 'Google, "a year ago"; screenshot 29 Oct 2026',
    text: 'I just want to give a big thank you to the lovely girls working at Priceline today! I was accidentally charged for an extra item I didn’t recognise, and they were so quick and helpful in sorting it out for me. They handled everything with such kindness and professionalism, it was crazy busy and they helped me immediately, props to them !!' },
];

/** Preview builds only (REVIEWS_PREVIEW=1): shows the layout before there are enough reviews. Never set in production. */
export const reviewsPreview = String(import.meta.env.REVIEWS_PREVIEW) === '1';

/** The homepage section, the /reviews/ page and the links to it appear once there are enough reviews and a current rating. */
export const reviewsLive = (reviews.length >= 4 && googleRating.count > 0) || reviewsPreview;
