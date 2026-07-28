<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vitepress';

onMounted(() => {
  const router = useRouter();
  router.go('/tutorial/flightplan');
})
</script>
