export default class DefaultEvictor {
  evict(config, pooledResource, availableObjectsCount) {
    const idleTime = Date.now() - pooledResource.lastIdleTime;

    if (
      config.softIdleTimeoutMillis < idleTime
            && config.min < availableObjectsCount
    ) {
      return true;
    }

    if (config.idleTimeoutMillis < idleTime) {
      return true;
    }

    return false;
  }
}
