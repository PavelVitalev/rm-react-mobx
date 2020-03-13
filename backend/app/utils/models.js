export const extractDataFromModelInstances = (instances) => (
    instances.map((instance) => {
      if (instance.getData) {
        return instance.getData();
      }

      return instance;
    })
);
