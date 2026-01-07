import { createClient } from "@supabase/supabase-js"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Hardcoded data from components
const events = [
  {
    title: "Spring Classic Competition",
    date: "2025-03-15",
    location: "CCRB Arena",
    description: "Annual bodybuilding competition featuring multiple categories for all experience levels.",
    image_url: "/bodybuilder.png",
    order_index: 0,
  },
  {
    title: "Nutrition Workshop",
    date: "2025-03-22",
    location: "Michigan Union",
    description: "Learn about meal planning, macros, and supplements from certified nutritionists.",
    image_url: "/bodybuilder.png",
    order_index: 1,
  },
  {
    title: "Powerlifting Meet",
    date: "2025-04-05",
    location: "IM Sports Building",
    description: "Test your strength in squat, bench press, and deadlift. All levels welcome.",
    image_url: "/bodybuilder.png",
    order_index: 2,
  },
  {
    title: "Guest Speaker Series",
    date: "2025-04-18",
    location: "Rackham Auditorium",
    description: "Hear from professional bodybuilders and fitness industry leaders.",
    image_url: "/bodybuilder.png",
    order_index: 3,
  },
  {
    title: "Summer Shred Challenge",
    date: "2025-05-10",
    location: "Recreation Center",
    description: "8-week transformation challenge with prizes for most improved physique.",
    image_url: "/bodybuilder.png",
    order_index: 4,
  },
  {
    title: "Posing Workshop",
    date: "2025-05-25",
    location: "Dance Studio 3",
    description: "Learn mandatory poses and stage presentation from competition veterans.",
    image_url: "/bodybuilder.png",
    order_index: 5,
  },
  {
    title: "Mr. & Ms. UMBC Finals",
    date: "2025-06-08",
    location: "Event Center",
    description: "The biggest bodybuilding competition of the year featuring cash prizes.",
    image_url: "/bodybuilder.png",
    order_index: 6,
  },
  {
    title: "Supplement Science Seminar",
    date: "2025-06-20",
    location: "Lecture Hall B",
    description: "Evidence-based approach to supplementation for muscle growth and recovery.",
    image_url: "/bodybuilder.png",
    order_index: 7,
  },
  {
    title: "Beach Muscle Expo",
    date: "2025-07-15",
    location: "Waterfront Park",
    description: "Outdoor fitness expo featuring vendor booths, demos, and meet & greets.",
    image_url: "/bodybuilder.png",
    order_index: 8,
  },
  {
    title: "Fall Prep Bootcamp",
    date: "2025-08-05",
    location: "Fitness Center",
    description: "Intensive 4-week program to prepare for upcoming competition season.",
    image_url: "/bodybuilder.png",
    order_index: 9,
  },
]

const resources = [
  {
    title: "Intro to Bodybuilding",
    description: "Complete beginner's guide to training, nutrition, and competition prep. Covers the fundamentals of muscle building and posing.",
    icon: "Dumbbell",
    link: "/jacob-zoller-slide-deck.pdf",
    embed_content: "Learn the basics of bodybuilding including proper form, training splits, and competition categories.",
    order_index: 0,
  },
  {
    title: "Nutrition Guide",
    description: "Comprehensive meal plans and macro calculations for muscle building. Includes cutting and bulking strategies.",
    icon: "Apple",
    link: "https://example.com/nutrition-guide.pdf",
    embed_content: "Master your nutrition with detailed meal plans, macro tracking, and supplement recommendations.",
    order_index: 1,
  },
  {
    title: "Training Programs",
    description: "Structured workout routines for all experience levels and goals. From beginner to advanced programs.",
    icon: "FileText",
    link: "https://example.com/training-programs.pdf",
    embed_content: "Access proven training programs including push/pull/legs, upper/lower, and competition prep routines.",
    order_index: 2,
  },
  {
    title: "Competition Handbook",
    description: "Everything you need to know about competing in bodybuilding shows. Peak week strategies included.",
    icon: "BookOpen",
    link: "https://example.com/competition-handbook.pdf",
    embed_content: "Complete guide to bodybuilding competitions including posing, tanning, and mental preparation.",
    order_index: 3,
  },
  {
    title: "Supplement Stack Guide",
    description: "Evidence-based supplement recommendations for muscle growth, recovery, and performance enhancement.",
    icon: "Dumbbell",
    link: "https://example.com/supplement-guide.pdf",
    embed_content: "Discover the most effective supplements for bodybuilding and how to use them safely.",
    order_index: 4,
  },
  {
    title: "Posing Tutorial",
    description: "Step-by-step guide to mandatory poses and stage presentation for competitions.",
    icon: "BookOpen",
    link: "https://example.com/posing-tutorial.pdf",
    embed_content: "Master the art of posing with detailed instructions for all mandatory poses and transitions.",
    order_index: 5,
  },
]

const boardMembers = [
  {
    name: "Jaden Shin",
    title: "President",
    email: "shinja@umbc.edu",
    bio: "Leading the club with passion for competitive bodybuilding and community building",
    image_url: "/bodybuilder.png",
    order_index: 0,
  },
  {
    name: "Sergey Kinsekelov",
    title: "Vice President",
    email: "",
    bio: "",
    image_url: "/bodybuilder.png",
    order_index: 1,
  },
  {
    name: "Gabe huttmeen",
    title: "Secretary",
    email: "",
    bio: "",
    image_url: "/bodybuilder.png",
    order_index: 2,
  },
  {
    name: "billlyyyyyy",
    title: "Treasurer",
    email: "",
    bio: "",
    image_url: "/bodybuilder.png",
    order_index: 3,
  },
]

const aboutContent = [
  {
    section_type: "paragraph",
    content: "The University of Michigan Bodybuilding Club is dedicated to fostering a community of athletes committed to excellence in training, nutrition, and personal development.",
    order_index: 0,
  },
  {
    section_type: "paragraph",
    content: "Founded in 2025, we bring together students passionate about bodybuilding, powerlifting, and fitness. Whether you're a seasoned competitor or just starting your fitness journey, our club provides the resources, mentorship, and support you need to achieve your goals.",
    order_index: 1,
  },
  {
    section_type: "stat",
    content: "Members",
    label: "Members",
    value: 150,
    order_index: 2,
  },
  {
    section_type: "stat",
    content: "Events/Year",
    label: "Events/Year",
    value: 20,
    order_index: 3,
  },
  {
    section_type: "stat",
    content: "Competitions",
    label: "Competitions",
    value: 5,
    order_index: 4,
  },
]

const aboutImages = [
  {
    image_url: "/bodybuilder.png",
    alt_text: "Training",
    order_index: 0,
  },
  {
    image_url: "/bodybuilder.png",
    alt_text: "Equipment",
    order_index: 1,
  },
  {
    image_url: "/bodybuilder.png",
    alt_text: "Competition",
    order_index: 2,
  },
  {
    image_url: "/bodybuilder.png",
    alt_text: "Team",
    order_index: 3,
  },
]

async function migrate() {
  console.log("\n=== Starting migration ===\n")

  // Insert events
  console.log("Migrating events...")
  const { data: eventsData, error: eventsError } = await supabase
    .from("events")
    .insert(events)
    .select()

  if (eventsError) {
    console.error("❌ Events migration error:", eventsError.message)
  } else {
    console.log(`✅ Migrated ${eventsData.length} events`)
  }

  // Insert resources
  console.log("\nMigrating resources...")
  const { data: resourcesData, error: resourcesError } = await supabase
    .from("resources")
    .insert(resources)
    .select()

  if (resourcesError) {
    console.error("❌ Resources migration error:", resourcesError.message)
  } else {
    console.log(`✅ Migrated ${resourcesData.length} resources`)
  }

  // Insert board members
  console.log("\nMigrating board members...")
  const { data: boardData, error: boardError } = await supabase
    .from("board_members")
    .insert(boardMembers)
    .select()

  if (boardError) {
    console.error("❌ Board members migration error:", boardError.message)
  } else {
    console.log(`✅ Migrated ${boardData.length} board members`)
  }

  // Insert about content
  console.log("\nMigrating about content...")
  const { data: aboutData, error: aboutError } = await supabase
    .from("about_content")
    .insert(aboutContent)
    .select()

  if (aboutError) {
    console.error("❌ About content migration error:", aboutError.message)
  } else {
    console.log(`✅ Migrated ${aboutData.length} about content items`)
  }

  // Insert about images
  console.log("\nMigrating about images...")
  const { data: imagesData, error: imagesError } = await supabase
    .from("about_images")
    .insert(aboutImages)
    .select()

  if (imagesError) {
    console.error("❌ About images migration error:", imagesError.message)
  } else {
    console.log(`✅ Migrated ${imagesData.length} about images`)
  }

  console.log("\n=== Migration complete! ===\n")
}

migrate()
