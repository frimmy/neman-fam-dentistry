// Single source of truth for all site copy. Edit a value, refresh, it updates.
// (Or use in-browser "Edit mode" to change text live — see js/main.js.)
window.SITE = {
  practiceName: "Neman Family Dentistry",
  shortName: "Neman Family Dentistry",
  tagline: "Let our family, treat your family.",
  heroHeadline: "A smile worth showing off.",
  heroSubhead:
    "Comprehensive and cosmetic dentistry for the whole family, at two convenient New York locations. New patients always welcome.",
  heroKicker: "Great Neck · Forest Hills, NY",

  cta: {
    book: "Book a Visit",
    bookLong: "Reserve Your Visit",
    // Real practice uses PatientConnect365; stubbed for the demo.
    bookUrl: "#book",
    call: "Call Us",
  },

  intro: {
    kicker: "Welcome",
    heading: "Dentistry that feels like family",
    body:
      "We are always welcoming new patients, and we would love to have you as part of our dental family. From routine cleanings to full smile makeovers, our team pairs modern technique with the kind of care you remember. Explore the practice, meet the team, and see the services we offer.",
  },

  services: {
    kicker: "What We Do",
    heading: "Care for every smile",
    subhead:
      "Featured treatments across both locations. Whatever brings you in, we will walk you through every option.",
    items: [
      {
        name: "Dental Implants",
        icon: "implant",
        blurb:
          "Permanent, natural-looking replacements for missing teeth that restore your bite and your confidence.",
      },
      {
        name: "Veneers",
        icon: "veneer",
        blurb:
          "Thin porcelain shells that transform stained, chipped, or uneven teeth into a bright, even smile.",
      },
      {
        name: "Teeth Whitening",
        icon: "whitening",
        blurb:
          "Professional whitening that lifts years of staining in a single visit — safely and evenly.",
      },
      {
        name: "Smile Makeover",
        icon: "makeover",
        blurb:
          "A personalized plan that combines treatments to design the smile you have always wanted.",
      },
      {
        name: "Emergency Dental Pain",
        icon: "pain",
        blurb:
          "Same-day relief for toothaches, cracks, and abscesses. Call us and we will get you seen.",
      },
      {
        name: "Invisalign®",
        icon: "align",
        blurb:
          "Clear, removable aligners that straighten teeth discreetly — no metal, no guessing.",
      },
    ],
  },

  team: {
    kicker: "Meet the Team",
    heading: "The dentists behind the smile",
    subhead:
      "Two dentists, one philosophy: treat every patient the way we would treat our own family.",
    members: [
      {
        name: "Dr. Nahid Neman",
        role: "Dentist",
        initials: "NN",
        bio:
          "A short bio goes here — background, training, and the kind of care Dr. Nahid Neman is known for. Add a sentence or two from the practice.",
      },
      {
        name: "Dr. Jonathan Neman",
        role: "Dentist",
        initials: "JN",
        bio:
          "A short bio goes here — background, training, and areas of focus for Dr. Jonathan Neman. Add a sentence or two from the practice.",
      },
    ],
  },

  about: {
    kicker: "About Us",
    heading: "Two locations, one dental family",
    body:
      "Neman Family Dentistry has served Great Neck and Forest Hills for years, growing one smile and one referral at a time. We believe great dentistry starts with listening — to your goals, your worries, and your schedule. Whether you are due for a cleaning or ready for a full transformation, you will be cared for by people who know your name.",
    stats: [
      { value: "2", label: "Convenient locations" },
      { value: "10k+", label: "Smiles cared for" },
      { value: "4.9★", label: "Average patient rating" },
    ],
  },

  savings: {
    kicker: "No Insurance? No Problem.",
    heading: "An in-house savings plan",
    body:
      "No dental insurance? Our membership plan covers your routine care and gives you meaningful discounts on treatment — no deductibles, no claim forms, no annual maximums.",
  },

  testimonials: {
    kicker: "Testimonials",
    heading: "What our patients say",
    subhead: "Real words from the families we care for.",
    items: [
      {
        quote:
          "Visiting Neman Family Dentistry gives my family and me more reasons to smile.",
        author: "The Johnson Family",
      },
      {
        quote:
          "Dr. Neman provided me with excellent care when I needed it the most.",
        author: "Jennifer R.",
      },
    ],
  },

  locations: {
    kicker: "Visit Us",
    heading: "Two convenient locations",
    items: [
      {
        key: "great-neck",
        name: "Great Neck",
        address: "64 Bayview Avenue, Great Neck, NY",
        phone: "(516) 773-4554",
        hours: [
          { day: "Monday", time: "9:00 am – 7:00 pm" },
          { day: "Tuesday", time: "9:00 am – 7:00 pm" },
          { day: "Wednesday", time: "9:00 am – 7:00 pm" },
          { day: "Thursday", time: "9:00 am – 7:00 pm" },
          { day: "Friday", time: "9:00 am – 2:00 pm" },
          { day: "Saturday", time: "Closed" },
          { day: "Sunday", time: "Closed" },
        ],
      },
      {
        key: "forest-hills",
        name: "Forest Hills",
        address: "68-63 108th Street, Suite #1J, Forest Hills, NY 11375",
        phone: "(718) 263-1010",
        hours: [
          { day: "Monday", time: "9:00 am – 7:00 pm" },
          { day: "Tuesday", time: "9:00 am – 7:00 pm" },
          { day: "Wednesday", time: "9:00 am – 7:00 pm" },
          { day: "Thursday", time: "9:00 am – 7:00 pm" },
          { day: "Friday", time: "9:00 am – 5:00 pm" },
          { day: "Saturday", time: "9:00 am – 4:00 pm" },
          { day: "Sunday", time: "Closed" },
        ],
      },
    ],
  },

  contact: {
    kicker: "Contact",
    heading: "Send us a message",
    subhead:
      "Questions, scheduling, or a new-patient hello — drop us a note and we will get right back to you.",
    email: "hello@nemanfamilydentistry.com",
  },

  // External destinations — stubbed for the demo (open nowhere real).
  social: {
    instagram: "#instagram",
    facebook: "#facebook",
  },

  footer: {
    blurb:
      "Comprehensive and cosmetic dentistry for the whole family in Great Neck and Forest Hills, New York.",
  },
};
