/**
 * Google reviews shown on /reviews/ and in the homepage "What our customers say" section (Jason, 29 Oct 2026).
 *
 * Rules for adding a review. They come from the law, not style, so keep to them:
 * - Only genuine Google reviews of Priceline Pharmacy Pacific Fair, copied word for word. Don't shorten, tidy or
 *   correct them: Ahpra warns that edited reviews can be misleading, and the ACCC says the same about cutting out
 *   the negative parts. Choose short reviews rather than trimming long ones.
 * - Only reviews about non-clinical things: the team's friendliness and helpfulness, service, speed, range, prices,
 *   the store, parking and opening hours. Leave out any review that mentions a symptom, condition, diagnosis,
 *   treatment, medicine, vaccination or result, or praises a pharmacist's skill, knowledge or advice: section 133 of
 *   the National Law bans using reviews about clinical aspects of a regulated health service. Nothing about
 *   Help Medical either; it's a separate business.
 * - First name and last initial only.
 * - Update googleRating whenever you check the Google listing. It sits next to the reviews, so it must be current.
 * - No review or rating schema: Google ignores self-serving reviews, and marking up reviews copied from Google
 *   breaks its structured data guidelines.
 */

export type Review = {
  /** First name and last initial, e.g. "Sam T." */
  name: string;
  /** The review exactly as written on Google */
  text: string;
  /** Month it was posted, YYYY-MM */
  date: string;
  /** Google star rating */
  stars: 5;
};

/** The Google listing's overall rating and review count, as shown on Google Maps on the date checked */
export const googleRating = { rating: '', count: 0, checked: '' };

export const reviews: Review[] = [
  // Google Business Profile notification, forwarded from info@ on 1 May 2024
  { name: 'Atlantis D.', text: 'Love the team here, very helpful and professional. Thank you ☺️', date: '2024-05', stars: 5 },
];

/** Preview builds only (REVIEWS_PREVIEW=1): shows the layout before there are enough reviews. Never set in production. */
export const reviewsPreview = String(import.meta.env.REVIEWS_PREVIEW) === '1';

/** The homepage section, the /reviews/ page and the links to it appear once there are enough reviews and a current rating. */
export const reviewsLive = (reviews.length >= 6 && googleRating.count > 0) || reviewsPreview;
