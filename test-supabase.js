const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://wcmukquemqsisxpfdcah.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjbXVrcXVlbXFzaXN4cGZkY2FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMDYzMjAsImV4cCI6MjA5MTY4MjMyMH0.AWoWxf2jgMk7CkIB3yvqj4NiSMec7Sp_AprWzntzVTA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  console.log('🧪 Testing Supabase connection...\n')
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1)
  
  if (error) {
    console.log('❌ Error:', error.message)
    console.log('Details:', error)
    return
  }
  
  console.log('✅ Supabase connected successfully!')
  console.log('✅ Tables found:', data)
}

test()
