<script lang="ts">
    import jQ from 'jquery';

    const spinner = function () {
        setTimeout(function () {
            if (jQ('#spinner').length > 0) {
                jQ('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
</script>

<div
      id="spinner"
      class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
    >
      <div
        class="spinner-border position-relative text-primary"
        style="width: 6rem; height: 6rem"
        role="status"
      ></div>
      <i
        class="fa fa-laptop-code fa-2x text-primary position-absolute top-50 start-50 translate-middle"
      ></i>
    </div>