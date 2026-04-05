<script setup lang="ts">
import cover from '@/assets/pages/cover.jpg'

const search = ref('')

const faqs = [
  {
    question: 'What is your return policy?',
    ans: 'Our return policy allows you to return products within 30 days of purchase for a full refund. The item must be in its original condition and packaging. Please contact our customer support team to initiate the return process.',
  },
  {
    question: 'How can I reset my password?',
    ans: 'To reset your password, go to the login page and click on the "Forgot Password" link. You will receive an email with instructions on how to create a new password. Follow the link provided in the email and enter your new password to regain access to your account.',
  },
  {
    question: 'What payment methods do you accept?',
    ans: 'We accept various payment methods, including credit cards (Visa, MasterCard, American Express), PayPal, and direct bank transfers. During the checkout process, you can choose the most convenient payment option for you.',
  },
  {
    question: 'Do you offer international shipping?',
    ans: 'Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary depending on the destination. Please enter your shipping address during checkout to see the available shipping options and costs.',
  },
  {
    question: 'How can I track my order?',
    ans: 'Once your order has been shipped, you will receive a shipping confirmation email with a tracking number and a link to the carrier\'s website. You can use this tracking number to monitor the status and location of your package during transit.',
  },
  {
    question: 'What is your privacy policy?',
    ans: 'Our privacy policy outlines how we collect, use, and protect your personal information. We are committed to safeguarding your data and ensuring its confidentiality. You can find our detailed privacy policy on our website\'s footer or privacy policy page.',
  },
  {
    question: 'Do you offer customer support on weekends?',
    ans: 'Yes, our customer support team is available seven days a week, including weekends and holidays. You can reach out to us via email, live chat, or phone, and we\'ll be happy to assist you with any inquiries or issues you may have.',
  },
]

// breadcrumbs
const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Pages',
    disabled: true,
  },
  {
    title: 'FAQs',
    disabled: true,
  },
]
</script>

<template>
  <VRow>
    <!-- Breadcrumbs -->
    <VCol cols="12">
      <VBreadcrumbs
        :items="breadcrumbs"
        divider="-"
        class="px-0"
      />
    </VCol>

    <VCol>
      <VCard>
        <VImg
          :src="cover"
          height="160"
          cover
          gradient="to bottom, rgba(0,0,0,.6), rgba(0,0,0,.5)"
        />
        <VCardText
          class="d-flex flex-column align-center"
          style="margin-top: -7rem;"
        >
          <h4
            class="text-h4 text-white text-no-wrap mb-6"
            style="z-index: 2;"
          >
            Frequently Asked Questions
          </h4>
          <div class="w-100">
            <VTextField
              v-model="search"
              variant="solo"
              density="default"
              prepend-inner-icon="mdi-magnify"
              placeholder="Type your keywords"
              bg-color="surface"
              style="max-width: 40rem;"
              class="mx-auto"
            >
              <template #append-inner>
                <VBtn
                  color="info"
                  size="small"
                  elevation="0"
                  icon="mdi-arrow-right"
                />
              </template>
            </VTextField>
          </div>
        </VCardText>
        <VCardText class="text-center">
          <p class="mb-0">
            Nisi praesentium similique totam odio obcaecati, reprehenderit, dignissimos rem temporibus ea inventore alias!
          </p>
          <p>
            Beatae animi nemo ea tempora, temporibus laborum facilis ut!
          </p>
          <div class="d-flex justify-center gap-4 flex-wrap mt-6">
            <VBtn
              color="primary"
              prepend-icon="mdi-email-outline"
            >
              Email us Your Query
            </VBtn>
            <VBtn
              color="info"
              prepend-icon="mdi-twitter"
            >
              Connect us at Twitter
            </VBtn>
          </div>
        </VCardText>
        <VCardText class="mt-6">
          <VContainer>
            <VExpansionPanels variant="accordion">
              <VExpansionPanel
                v-for="faq in faqs"
                :key="faq.question"
                :title="faq.question"
                :text="faq.ans"
              />
            </VExpansionPanels>
          </VContainer>
        </VCardText>
        <VCardText class="text-center mt-6 pb-10">
          <h4 class="text-h4">
            Still can’t find your answer?
          </h4>
          <p>We are happy to help</p>
          <VBtn
            variant="outlined"
            color="info"
            prepend-icon="mdi-chat"
          >
            Chat with us
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
